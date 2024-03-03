import { RouterProvider } from 'react-router-dom';
import { router } from './router/router';
import { NextUIProvider } from '@nextui-org/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DocumentsProvider } from './context/DocumentsContext';
function App() {
  return (
    <NextUIProvider>
      <DocumentsProvider>
        <RouterProvider router={router} />
      </DocumentsProvider>
      <ToastContainer position="top-center" />
    </NextUIProvider>
  );
}

export default App;
