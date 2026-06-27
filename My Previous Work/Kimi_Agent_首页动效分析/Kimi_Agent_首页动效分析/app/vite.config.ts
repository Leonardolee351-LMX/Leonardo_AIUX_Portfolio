import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  base: './',
  plugins: command === "serve" ? [inspectAttr(), react()] : [react()],
  build: {
    outDir: path.resolve(__dirname, "../../../..", "docs"),
    emptyOutDir: false,
    cssCodeSplit: false,
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, "index.html"),
      },
    },
  },
  server: {
    port: 3000,
    proxy: {
      "/docs": "http://127.0.0.1:8000",
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
