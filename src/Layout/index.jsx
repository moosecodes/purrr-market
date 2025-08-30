import React, { useEffect, useState } from 'react';
import Gallery from '../Components/Gallery';
import Header from '../Components/Header';
import Cart from '../Components/Cart';
import Grid from '@mui/material/Grid';
import SpeedDial from '../Components/SpeedDial';
import { InView } from 'react-intersection-observer';

export default function Layout() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

  const limit = Number(import.meta.env.VITE_API_LIMIT ?? 20);
  const API = import.meta.env.VITE_API_URL ?? 'https://api.thecatapi.com/v1/images/search';
  const KEY = import.meta.env.VITE_API_KEY ?? '';
  const headers = KEY ? { 'x-api-key': KEY } : {};

  async function fetchProducts() {
  if (isLoading || !hasMore) return;
  setIsLoading(true);

  const KEY = import.meta.env.VITE_API_KEY ?? '';
  const headers = KEY ? { 'x-api-key': KEY } : {};
  const limit = Number(import.meta.env.VITE_API_LIMIT ?? 20);

  try {
    // 1) Get all breeds
    const breedsRes = await fetch('https://api.thecatapi.com/v1/breeds', { headers });
    const breeds = await breedsRes.json();

    const start = page * limit;
    const chunk = breeds.slice(start, start + limit);

    // 2) For each breed fetch 1 image; if none, fall back to breed.image
    const items = (await Promise.all(
      chunk.map(async (b, i) => {
        try {
          const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${encodeURIComponent(
            b.id
          )}&limit=1&include_breeds=1`;
          const r = await fetch(url, { headers });
          const arr = await r.json();
          const img = Array.isArray(arr) ? arr[0] : null;

          if (img?.url) {
            return {
              ...img,
              id: img.id || `${b.id}-${start + i}`,
              // Guarantee a name even if the image lacks breeds
              breeds: Array.isArray(img.breeds) && img.breeds.length ? img.breeds : [b]
            };
          }
        } catch (_) {}

        // Fallback: synthesize an item from breed data
        return {
          id: `${b.id}-${start + i}`,
          url: b.image?.url || '',
          breeds: [b]
        };
      })
    )).filter(Boolean);

    // 3) Append + dedupe
    setProducts(prev => {
      const map = new Map(prev.map(p => [p.id || p.url, p]));
      for (const it of items) map.set(it.id || it.url, it);
      return Array.from(map.values());
    });

    setHasMore(start + limit < breeds.length);
    setPage(p => p + 1);
    setError(null);

    // sanity log
    console.table(items.slice(0, 5).map(x => ({
      id: x.id, breeds_len: x?.breeds?.length ?? 0, name: x?.breeds?.[0]?.name ?? ''
    })));
  } catch (e) {
    setError(e);
  } finally {
    setIsLoading(false);
  }
}
  // initial load once
  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Header />
      </Grid>

      <Grid item xs={12} md={10}>
        <h2>{products.length} cats loaded</h2>
        <Gallery products={products} />

        <InView
          as="div"
          onChange={(inView) => {
            if (inView && !isLoading && hasMore) fetchProducts();
          }}
        >
          <h2 style={{ opacity: isLoading ? 0.6 : 1 }}>
            {isLoading ? 'Loading…' : `${products.length} cats loaded`}
          </h2>
          {error ? <p style={{ color: 'crimson' }}>Load error</p> : null}
          {!hasMore ? <p>End of list</p> : null}
        </InView>
      </Grid>

      <Grid item xs={12} md={2}>
        <Cart />
      </Grid>

      <Grid item xs={12}>
        <footer />
      </Grid>

      <SpeedDial />
    </Grid>
  );
}
