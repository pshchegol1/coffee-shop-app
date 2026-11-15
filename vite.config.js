import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// On Windows the working directory can start with a lowercase drive letter ("c:\…", as
// VS Code's terminal opens it), while Vite resolves files to "C:\…". The inline <style> in
// index.html is then stored under one spelling and looked up under the other, failing the
// build with "No matching HTML proxy module found". Pinning the root to an uppercase drive
// letter keeps the two in agreement.
const root = process.cwd().replace(/^[a-z]:/, (drive) => drive.toUpperCase());

export default defineConfig({
  root,
  plugins: [react(), tailwindcss()],
  server: {
    host: "0.0.0.0",
    port: 3000,
    strictPort: true,
    hmr: {
      port: 3000,
    },
  },
});
