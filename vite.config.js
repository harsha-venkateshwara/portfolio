import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // The project lives on a Windows OneDrive mount (/mnt/c) accessed from WSL,
    // where inotify file events don't cross the filesystem boundary — so Vite's
    // watcher never sees edits and HMR silently stops working. Polling fixes it.
    watch: { usePolling: true, interval: 200 },
  },
});
