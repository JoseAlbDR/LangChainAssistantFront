import { Navigate, createBrowserRouter } from 'react-router-dom';
import DashboardLayout from '../presentation/layouts/DashboardLayout';
import { MenuItem } from '../interfaces';
import { ChatBotPage } from '../presentation/pages';
import { DocumentsDropDown } from '../presentation/components';

import { loader as documentsLoader } from '../presentation/layouts/DashboardLayout';

export const menuRoutes: MenuItem[] = [
  {
    to: '/chat-bot',
    icon: 'fa-solid fa-robot',
    title: 'Chat Bot',
    description: 'Chat with documents',
    component: <ChatBotPage />,
  },
  {
    to: '/documents',
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
      ...menuRoutes.map((route) => ({
        path: route.to,
        element: route.component,
      })),
      {
        path: '',
        element: <Navigate to={menuRoutes[0].to} />,
      },
    ],
  },
]);
