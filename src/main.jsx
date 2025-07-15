import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import { routesConfig } from './config';
import { store } from './store/store';
import { Provider } from 'react-redux';

const queryClient = new QueryClient();
const router = createBrowserRouter(routesConfig());

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
    </Provider>
  </StrictMode>
);