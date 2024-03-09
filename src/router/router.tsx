import { Navigate, createBrowserRouter } from 'react-router-dom';
import DashboardLayout from '../presentation/layouts/DashboardLayout';
import { MenuItem } from '../interfaces';
import {
  DocumentAssistantPage,
  ChatBotPage,
  DocumentsPage,
} from '../presentation/pages';
import { DocumentsDropDown } from '../presentation/components';

import { loader as dashboardLoader } from '../presentation/layouts/DashboardLayout';
import { loader as chatHistoryLoader } from '../presentation/pages/chat-bot/ChatBotPage';
import { loader as documentLoader } from '../presentation/pages/documents/DocumentAssistantPage';

import { QueryClient } from '@tanstack/react-query';
import ErrorPage from '../presentation/pages/error/ErrorPage';

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
    path: '/',
    element: <DashboardLayout />,
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
        path: '',
        element: <Navigate to={menuRoutes[0].to} />,
      },
    ],
  },
]);
