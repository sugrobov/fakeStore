import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';

// import ProductDetail from './components/ProductDetail.jsx';

const queryClient = new QueryClient();

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <App />,
//   },
//   {
//     path: '/products/:id',
//     element: <ProductDetail />
//   }
// ]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      <App />
      </BrowserRouter>
     
    </QueryClientProvider>
  </StrictMode>,
)
