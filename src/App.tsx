import { RouterProvider } from 'react-router-dom';
import { router } from './router/router';
import { NextUIProvider } from '@nextui-org/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DocumentsProvider } from './context/DocumentsContext';
import { ChatProvider } from './context/ChatContext';
function App() {
  return (
    <NextUIProvider>
      <DocumentsProvider>
        <ChatProvider>
          <RouterProvider router={router} />
        </ChatProvider>
      </DocumentsProvider>
      <ToastContainer position="top-center" />
    </NextUIProvider>
  );
}

export default App;
