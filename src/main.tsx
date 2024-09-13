import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './app'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { DialogProvider } from './context/DialogContext'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <DialogProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </DialogProvider>
  </QueryClientProvider>
)
