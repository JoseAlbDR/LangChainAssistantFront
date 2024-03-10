import { Outlet, useNavigate } from 'react-router-dom';

import { QueryClient } from '@tanstack/react-query';
import { configQuery } from './useConfig';
import { documentsQuery } from './useDocuments';
import Navigation from '../components/navbar/Navigation';
import { NextUIProvider } from '@nextui-org/react';
import useDarkMode from 'use-dark-mode';

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
  // const { isFetching: isLoadingConfig, data: config } = useConfig();
  // const { isFetching: isLoadingDocuments } = useDocuments();

  const darkMode = useDarkMode();
  const navigate = useNavigate();

  return (
    <NextUIProvider navigate={navigate}>
      <main
        className={`${
          darkMode.value ? 'dark' : ''
        } text-foreground bg-background flex flex-col items-center content-center min-h-fit`}
      >
        <Navigation />
        <section className="sm:mx-3 flex flex-col h-[calc(100vh-80px)] bg-opacity-10 p-5 rounded-3xl lg:w-3/5">
          <div className="flex flex-row h-full">
            <div className="flex flex-col flex-auto h-full p-1 ">
              <Outlet />
            </div>
          </div>
        </section>
      </main>
    </NextUIProvider>
    // <main className="flex flex-row mt-7">
    //   <nav className="hidden sm:flex flex-col ml-5 w-[370px] min-h-[calc(100vh-3.0rem)] bg-white bg-opacity-10 p-5 rounded-3xl">
    //     <div className="flex justify-between items-center">
    //       <h1 className="font-bold text-lg lg:text-3xl from-white">
    //         Chat Bot
    //         <span className="text-indigo-500"></span>
    //       </h1>
    //       {isLoadingConfig ? <Spinner /> : <ConfigModal config={config!} />}
    //     </div>
    //     <span className="text-xl text-stone-300">Bienvenido!</span>

    //     <div className="border-gray-700 border my-3" />

    //     {menuRoutes.map((item) => (
    //       <SidebarItem key={item.to} {...item} />
    //     ))}
    //     {isLoadingDocuments ? <Spinner /> : <DocumentsDropDown />}
    //   </nav>

    //   <section className="mx-3 sm:mx-20 flex flex-col w-full h-[calc(100vh-50px)]  bg-white bg-opacity-10 p-5 rounded-3xl">
    //     <div className="flex flex-row h-full">
    //       <div className="flex flex-col flex-auto h-full p-1">
    //         <Outlet />
    //       </div>
    //     </div>
    //   </section>
    // </main>
  );
};

export default DashboardLayout;
