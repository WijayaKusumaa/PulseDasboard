import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";

export default defineConfig({
  base: "/PulseDasboard/",
  plugins: [
    tanstackStart({
      server: { entry: "server" },
      spa: {
        enabled: true
      },
      prerender: {
        routes: ["/"]
      }
    }),
    react(),
    tailwindcss(),
  ],
  resolve: {
    tsconfigPaths: true,
  },
});
