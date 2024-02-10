import { afterEach } from 'vitest';
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

afterEach(() => {
    cleanup();    
});

Object.defineProperty(import.meta, 'env', {
    value: {
      VITE_BASE_URL: 'http://localhost:3001',
    },
  });