import { Outlet } from 'react-router-dom';
import { menuRoutes } from '../../router/router';
import SidebarItem from '../components/sidebar/SidebarItem';
import { ConfigModal, DocumentsDropDown } from '../components';

import { QueryClient } from '@tanstack/react-query';
import { configQuery, useConfig } from './useConfig';
import { documentsQuery, useDocuments } from './useDocuments';
import { Spinner } from '@nextui-org/react';

export interface Config {
  modelName: string;
  temperature: number;
  maxTokens: number;
}

export const loader = (queryClient: QueryClient) => async () => {
  const config = await queryClient.ensureQueryData(configQuery());
  const documents = await queryClient.ensureQueryData(documentsQuery());
  return { documents, config };
};

const DashboardLayout = () => {
  const { isFetching: isLoadingConfig, data: config } = useConfig();
  const { isFetching: isLoadingDocuments } = useDocuments();

  return (
    <main className="flex flex-row mt-7">
      <nav className="hidden sm:flex flex-col ml-5 w-[370px] min-h-[calc(100vh-3.0rem)] bg-white bg-opacity-10 p-5 rounded-3xl">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-lg lg:text-3xl from-white">
            Chat Bot
            <span className="text-indigo-500"></span>
          </h1>
          {isLoadingConfig ? <Spinner /> : <ConfigModal config={config!} />}
        </div>
        <span className="text-xl text-stone-300">Bienvenido!</span>

        <div className="border-gray-700 border my-3" />

        {menuRoutes.map((item) => (
          <SidebarItem key={item.to} {...item} />
        ))}
        {isLoadingDocuments ? <Spinner /> : <DocumentsDropDown />}
      </nav>

      <section className="mx-3 sm:mx-20 flex flex-col w-full h-[calc(100vh-50px)]  bg-white bg-opacity-10 p-5 rounded-3xl">
        <div className="flex flex-row h-full">
          <div className="flex flex-col flex-auto h-full p-1">
            <Outlet />
          </div>
        </div>
      </section>
    </main>
  );
};

export default DashboardLayout;
