import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

export default defineConfig({
   base: "/PrideAdvisoryHub/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
})













// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import path from "path";
// import { fileURLToPath } from "url";

// // This part teaches the computer how to find your folders
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//       "@shared": path.resolve(__dirname, "../shared"),
//       "@assets": path.resolve(__dirname, "../../attached_assets"),
//     },
//   },
// })


// import { defineConfig } from "vite"
// import react from "@vitejs/plugin-react"
// import path from "path"
// import { fileURLToPath } from "url"

// // Manually define __dirname for ESM
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// export default defineConfig({
//  // base: "/PrideAdvisoryHub/",
//   plugins: [react()],
//  resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//       "@shared": path.resolve(__dirname, "../shared"),
//       "@assets": path.resolve(__dirname, "../../attached_assets"),
//     },
//   },

//   // resolve: {
//   //   alias: {
//   //     "@": path.resolve(__dirname, "./src"),
//   //   },
//   // },
//   build: {
//     outDir: "dist",
//     emptyOutDir: true,
//   },
// })

