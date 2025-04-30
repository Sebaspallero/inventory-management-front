import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { Toaster } from "@/components/ui/sonner"

import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/react-query'

import { RouterProvider } from 'react-router-dom';
import { AppRouter } from './routes/AppRouter';

import './lib/i18n';

import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={AppRouter} />
      <Toaster richColors />
    </QueryClientProvider>
  </StrictMode>
)
