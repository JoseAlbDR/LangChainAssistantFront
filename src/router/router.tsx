import { createBrowserRouter } from 'react-router-dom';
import DashboardLayout from '../presentation/layouts/DashboardLayout';
import { MenuItem } from '../interfaces';

export const menuRoutes: MenuItem[] = [
  {
    to: '/chat-bot',
    icon: 'fa-solid fa-robot',
    title: 'Chat Bot',
    description: 'Chat with documents',
    component: '',
  },
];

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardLayout />,
  },
]);
