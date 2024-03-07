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
import { QueryClient } from '@tanstack/react-query';

export const menuRoutes: MenuItem[] = [
  {
    to: '/chat-bot',
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
      staleTime: 0,
    },
  },
});

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardLayout />,
    loader: dashboardLoader(queryClient),
    children: [
      {
        path: 'chat-bot',
        element: <ChatBotPage />,
        loader: chatHistoryLoader,
      },
      {
        path: 'documents/',
        element: <DocumentsPage />,
      },
      {
        path: 'document-assistant/:name',
        element: <DocumentAssistantPage />,
      },
      {
        path: 'config',
      },

      {
        path: '',
        element: <Navigate to={menuRoutes[0].to} />,
      },
    ],
  },
]);
