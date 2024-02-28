import { Navigate, createBrowserRouter } from 'react-router-dom';
import DashboardLayout from '../presentation/layouts/DashboardLayout';
import { MenuItem } from '../interfaces';
import { ChatBotPage } from '../presentation/pages';

export const menuRoutes: MenuItem[] = [
  {
    to: '/chat-bot',
    icon: 'fa-solid fa-robot',
    title: 'Chat Bot',
    description: 'Chat with documents',
    component: <ChatBotPage />,
  },
];

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardLayout />,
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
