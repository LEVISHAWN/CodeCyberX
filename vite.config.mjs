import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tagger from "@dhiwise/component-tagger";

/*
  Consolidated Vite config
  - build.outDir: 'build' (changed from default 'dist')
  - plugins: tsconfig path support, React JSX + fast refresh, component tagger
  - server: dev server config (port, host). strictPort prevents automatic fallback.
  - allowedHosts: add hostnames you might use for previews/tunnels.
*/

export default defineConfig({
  build: {
    outDir: "build",
    chunkSizeWarningLimit: 2000,
  },
  plugins: [tsconfigPaths(), react(), tagger()],
  server: {
    port: 4028, // numeric is fine
    host: "0.0.0.0",
    strictPort: true,
    allowedHosts: [".amazonaws.com", ".builtwithrocket.new"],
  },
});