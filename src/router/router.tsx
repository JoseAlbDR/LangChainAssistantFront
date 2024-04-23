import { Navigate, createBrowserRouter } from 'react-router-dom';
import AppLayout from '../presentation/layouts/AppLayout';
import { MenuItem } from '../interfaces';
import {
  DocumentAssistantPage,
  ChatBotPage,
  DocumentsPage,
  LoginPage,
  RegisterPage,
  ErrorPage,
} from '../presentation/pages';
import { ConfigModal, DocumentsDropDown } from '../presentation/components';

import { loader as dashboardLoader } from '../presentation/layouts/AppLayout';
import { loader as chatHistoryLoader } from '../presentation/pages/chat-bot/ChatBotPage';
import { loader as documentLoader } from '../presentation/pages/documents/DocumentAssistantPage';

import { QueryClient } from '@tanstack/react-query';

export const menuRoutes: MenuItem[] = [
  {
    to: '/chatgpt',
    icon: 'fa-solid fa-robot',
    title: 'Chat Bot',
    description: 'Your personal GPT',
    component: <ChatBotPage />,
  },
  {
    to: '/documents/',
    icon: 'fa-solid fa-book',
    title: 'Documentos',
    description: 'Documentos subidos',
    component: <DocumentsDropDown />,
  },
];

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 15,
    },
  },
});

export const router = createBrowserRouter([
  {
    path: 'login',
    element: <LoginPage />,
  },
  {
    path: 'register',
    element: <RegisterPage />,
  },
  {
    path: '/',
    element: <AppLayout />,
    loader: dashboardLoader(queryClient),
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'chatgpt',
        element: <ChatBotPage />,
        loader: chatHistoryLoader(queryClient),
      },
      {
        path: 'documents/',
        element: <DocumentsPage />,
      },
      {
        path: 'assistant/:name',
        element: <DocumentAssistantPage />,
        loader: documentLoader(queryClient),
      },
      {
        path: 'config',
        element: <ConfigModal />,
      },
      {
        path: '',
        element: <Navigate to={menuRoutes[0].to} />,
      },
    ],
  },
]);
