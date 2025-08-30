import React, { useState, useEffect } from 'react';

export default function FadeImg({ src, alt, style, ...props }) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => setLoaded(false), [src]);

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onLoad={() => setLoaded(true)}
      onError={() => setLoaded(true)}
      style={{ opacity: loaded ? 1 : 0, transition: 'opacity 400ms ease', display: 'block', width: '100%', ...style }}
      {...props}
    />
  );
}
