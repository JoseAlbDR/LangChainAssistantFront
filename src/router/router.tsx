import { Navigate, createBrowserRouter } from 'react-router-dom';
import DashboardLayout from '../presentation/layouts/DashboardLayout';
import { MenuItem } from '../interfaces';
import {
  DocumentAssistantPage,
  ChatBotPage,
  DocumentsPage,
} from '../presentation/pages';
import { DocumentsDropDown } from '../presentation/components';

import { loader as documentsLoader } from '../presentation/layouts/DashboardLayout';
import { loader as chatHistoryLoader } from '../presentation/pages/chat-bot/ChatBotPage';

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

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardLayout />,
    loader: documentsLoader,
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
        path: '',
        element: <Navigate to={menuRoutes[0].to} />,
      },
    ],
  },
]);
