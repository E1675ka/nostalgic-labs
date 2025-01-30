import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 3000, // Set the warning limit to 1000 kB
  },
});
// export default {
//   build: {
//     chunkSizeWarningLimit: 1000, // Set the warning limit to 1000 kB
//   },
// };
