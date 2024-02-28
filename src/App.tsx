import { RouterProvider } from 'react-router-dom';
import { router } from './router/router';
import { NextUIProvider } from '@nextui-org/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <NextUIProvider>
      <RouterProvider router={router} />
      <ToastContainer position="top-center" />
    </NextUIProvider>
  );
}

export default App;
