import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Otras configuraciones de Vite pueden ir aquí
  server: {
    // Configuración del servidor de desarrollo
    port: 3000, // Puerto en el que se ejecutará el servidor
  },
  build: {
    sourcemap: true, // Generar mapas de origen para depuración
  },
})
