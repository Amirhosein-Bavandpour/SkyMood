import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),

    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.webp", "robots.txt"],

      manifest: {
        name: "Iran Weather Dashboard",
        short_name: "Iran Weather",
        description:
          "A modern React weather dashboard for Iranian cities with forecasts, air quality, charts, favorites, and multilingual support.",
        theme_color: "#0f172a",
        background_color: "#dbeafe",
        display: "standalone",
        orientation: "portrait",
        scope: "/",
        start_url: "/",

        icons: [
          {
            src: "/pwa-192x192.webp",
            sizes: "192x192",
            type: "image/webp",
          },
          {
            src: "/pwa-512x512.webp",
            sizes: "512x512",
            type: "image/webp",
          },
          {
            src: "/pwa-512x512.webp",
            sizes: "512x512",
            type: "image/webp",
            purpose: "any maskable",
          },
        ],
      },

      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,webp}"],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.open-meteo\.com\/.*/i,
            handler: "NetworkFirst",
            options: {
              cacheName: "weather-api-cache",
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 10 * 60,
              },
            },
          },
          {
            urlPattern: /^https:\/\/air-quality-api\.open-meteo\.com\/.*/i,
            handler: "NetworkFirst",
            options: {
              cacheName: "air-quality-api-cache",
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 10 * 60,
              },
            },
          },
        ],
      },
    }),
  ],
});
