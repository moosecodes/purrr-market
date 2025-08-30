// src/Layout/index.jsx
import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { Container, Typography, Grid, Box } from '@mui/material';
import { InView } from 'react-intersection-observer';

import Header from '../Components/Header';
import Gallery from '../Components/Gallery';
import Cart from '../Components/Cart';
import SpeedDial from '../Components/SpeedDial';

const norm = (s) =>
  String(s || '').toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');

export default function Layout() {
  // data + paging
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

  // strict-mode and scroll guards
  const didInit = useRef(false);
  const [hasUserScrolled, setHasUserScrolled] = useState(false);

  // search state
  const [typingQuery, setTypingQuery] = useState(''); // what user types
  const [query, setQuery] = useState('');             // applied filter
  const [mode, setMode] = useState('partial');        // 'partial' | 'exact'

  // env
  const limit = Number(import.meta.env.VITE_API_LIMIT ?? 20);
  const API = import.meta.env.VITE_API_URL ?? 'https://api.thecatapi.com/v1/images/search';
  const KEY = import.meta.env.VITE_API_KEY ?? '';

  // fetch page
  const fetchProducts = useCallback(async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    try {
      const headers = KEY ? { 'x-api-key': KEY } : {};
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

      // fallback to breed-driven fetch if none include breeds
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
            } catch (e) {
              /* ignore single-breed fetch errors; placeholder below */
            }
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
  }, [isLoading, hasMore, page, limit, API, KEY]);

  // initial load
  useEffect(() => {
    if (didInit.current) return;
    didInit.current = true;
    fetchProducts();
  }, [fetchProducts]);

  // detect user scroll to avoid auto-trigger on mount
  useEffect(() => {
    const onScroll = () => setHasUserScrolled(true);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // suggestions from LOADED cats
  const breedSuggestions = useMemo(() => {
    const names = [];
    for (const it of products) {
      const n = it?.breeds?.[0]?.name;
      if (n) names.push(n);
    }
    return Array.from(new Set(names));
  }, [products]);

  // apply filter
  const visible = useMemo(() => {
    const q = norm(query).trim();
    if (!q) return products;

    if (mode === 'exact') {
      return products.filter(it => norm(it?.breeds?.[0]?.name) === q);
    }
    // partial contains across a few fields
    return products.filter((it) => {
      const b = it?.breeds?.[0] || {};
      return (
        norm(b.name).includes(q) ||
        norm(b.origin).includes(q) ||
        norm(b.temperament).includes(q) ||
        norm(it.id).includes(q)
      );
    });
  }, [products, query, mode]);

  const statusText = error
    ? 'Load error'
    : isLoading
    ? 'Loading…'
    : !hasMore && !query
    ? 'End of list'
    : query
    ? `${visible.length} results • ${products.length} loaded`
    : `${products.length} cats loaded`;

  const applySearch = () => {
    const typed = typingQuery.trim();
    const exactExists = breedSuggestions.some((n) => norm(n) === norm(typed));
    setQuery(typed);
    setMode(exactExists ? 'exact' : 'partial');
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Header
          query={typingQuery}
          onQueryChange={setTypingQuery}
          onSearchSubmit={applySearch}
          onClear={() => { setTypingQuery(''); setQuery(''); setMode('partial'); }}
          suggestions={breedSuggestions}
        />
      </Grid>

      <Grid item xs={12}>
        <Container>
          {/* status + cart */}
          <Grid container spacing={2} alignItems="flex-start" justifyContent="space-between" sx={{ mb: 2 }}>
            <Grid item xs={12} md="auto">
              <Typography variant="h6">{statusText}</Typography>
            </Grid>
            <Grid item xs={12} md>
              <Box sx={{ maxWidth: 520, ml: { md: 'auto' } }}>
                <Cart />
              </Box>
            </Grid>
          </Grid>

          <Gallery products={visible} />

          <InView
            as="div"
            rootMargin="300px 0px"
            initialInView={false}
            onChange={(inView) => {
              if (hasUserScrolled && inView && !isLoading && hasMore) fetchProducts();
            }}
          >
            <Box sx={{ height: 1 }} />
          </InView>
        </Container>
      </Grid>

      <Grid item xs={12}>
        <footer />
      </Grid>

      <SpeedDial />
    </Grid>
  );
}
