import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import './index.css';

// QueryClient — «мозг» библиотеки: держит кэш и настройки по умолчанию
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000, // данные «свежие» 30 сек — повторный запрос не нужен
      retry: 1, // 1 повторная попытка при ошибке
      refetchOnWindowFocus: false, // не перезапрашивать при возврате на вкладку
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
