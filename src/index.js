import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClientProvider, QueryClient } from 'react-query'
import './index.css';
import App from './App';
import { Provider as AuthProvider } from './context/authContext/authContext'
import { Provider as SnackbarProvider } from './context/notificationContext/notificationContext'

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <SnackbarProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </SnackbarProvider>
    </AuthProvider>
  </React.StrictMode>
);
