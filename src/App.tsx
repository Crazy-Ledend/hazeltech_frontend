import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from './hooks/useTheme';
import RootLayout from './layouts/RootLayout';
import Home from './pages/Home';
import Products from './pages/Products';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import Apply from './pages/Apply';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'products', element: <Products /> },
      { path: 'services', element: <Services /> },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
      { path: 'apply', element: <Apply /> },
    ],
  },
]);

import { ModalProvider } from './hooks/useModal';

export default function App() {
  return (
    <ThemeProvider>
      <ModalProvider>
        <RouterProvider router={router} />
      </ModalProvider>
    </ThemeProvider>
  );
}
