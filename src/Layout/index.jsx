// src/Layout/index.jsx
import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Box } from '@mui/material';
import { InView } from 'react-intersection-observer';

import Header from '../Components/Header';
import Gallery from '../Components/Gallery';
import Cart from '../Components/Cart';
import SpeedDial from '../Components/SpeedDial';

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
    try {
      // try images search with breeds included
      const params = new URLSearchParams({
        limit: String(limit),
        has_breeds: '1',
        include_breeds: '1',
        order: 'Desc',
        page: String(page)
      }).toString();

      const res = await fetch(`${API}?${params}`, { headers });
      let items = await res.json();
      items = Array.isArray(items) ? items : [];

      // fallback: fetch by breed if no breed data returned
      const noneHaveBreeds = !items.some(x => Array.isArray(x?.breeds) && x.breeds.length > 0);
      if (noneHaveBreeds) {
        const breedsRes = await fetch('https://api.thecatapi.com/v1/breeds', { headers });
        const breeds = await breedsRes.json();
        const start = page * limit;
        const chunk = breeds.slice(start, start + limit);

        const byBreed = await Promise.all(
          chunk.map(async (b, i) => {
            try {
              const url = `${API}?breed_ids=${encodeURIComponent(b.id)}&limit=1&include_breeds=1`;
              const r = await fetch(url, { headers });
              const arr = await r.json();
              const img = Array.isArray(arr) ? arr[0] : null;
              if (img?.url) {
                return {
                  ...img,
                  id: img.id || `${b.id}-${start + i}`,
                  breeds: Array.isArray(img.breeds) && img.breeds.length ? img.breeds : [b]
                };
              }
            } catch {}
            return { id: `${b.id}-${start + i}`, url: b.image?.url || '', breeds: [b] };
          })
        );
        items = byBreed.filter(Boolean);
      }

      // append + dedupe
      setProducts(prev => {
        const map = new Map(prev.map(p => [p.id || p.url, p]));
        for (const it of items) map.set(it.id || it.url, it);
        return Array.from(map.values());
      });

      setHasMore(items.length === limit);
      setPage(p => p + 1);
      setError(null);
    } catch (e) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const statusText = error
    ? 'Load error'
    : isLoading
    ? 'Loading…'
    : !hasMore
    ? 'End of list'
    : `${products.length} cats loaded`;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Header />
      </Grid>

      <Grid item xs={12} md={10}>
        <Container>
          <Typography variant="h6" sx={{ mb: 2 }}>{statusText}</Typography>

          <Gallery products={products} />

          <InView
            as="div"
            onChange={(inView) => {
              if (inView && !isLoading && hasMore) fetchProducts();
            }}
          >
            {/* invisible sentinel for infinite scroll */}
            <Box sx={{ height: 1 }} />
          </InView>
        </Container>
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
