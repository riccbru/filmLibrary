import { lazy } from 'react';

const LazyTable = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(import("./FilmTable"));
    }, 600);
  });
});

export default LazyTable;