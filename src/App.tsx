import { RouterProvider } from 'react-router-dom';
import { queryClient, router } from './router/router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DocumentsProvider } from './context/DocumentsContext';
import { ChatProvider } from './context/ChatContext';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import useDarkMode from 'use-dark-mode';

function App() {
  const darkMode = useDarkMode();

  console.log({ darkMode });

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <DocumentsProvider>
        <ChatProvider>
          <main
            className={`${
              darkMode.value ? 'dark' : ''
            } text-foreground bg-background`}
          >
            <RouterProvider router={router} />
          </main>
        </ChatProvider>
      </DocumentsProvider>
      <ToastContainer position="top-center" />
    </QueryClientProvider>
  );
}

export default App;
