import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

import { ChakraProvider } from '@chakra-ui/react';
import Header from './components/Header.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider>
      <Header />
      <App />
    </ChakraProvider>
  </StrictMode>,
)
