import { Navigate, Outlet, redirect, useNavigate } from 'react-router-dom';

import { QueryClient } from '@tanstack/react-query';
import { configQuery, useConfig } from './useConfig';
import { documentsQuery } from './useDocuments';
import Navigation from '../components/navbar/Navigation';
import { Button, Link, Navbar, NavbarContent, NavbarItem, NextUIProvider } from '@nextui-org/react';
import useDarkMode from 'use-dark-mode';
import { authStatusQuery } from './useAuthStatus';
import { AxiosError } from 'axios';
import { setAuthorizationHeader } from '../../api/client';
import { storage } from '../../utils/storage';
import { toast } from 'react-toastify';
import { ConfigModal, DocumentsDropDown } from '../components';
import DocumentUploadModal from '../components/documents/DocumentUploadModal';
import { IconRobotFace } from '@tabler/icons-react';

export interface Config {
  modelName: string;
  temperature: number;
  maxTokens: number;
}

export const loader = (queryClient: QueryClient) => async () => {
  const accessToken = storage.get('accessToken');
  console.log({ accessToken });
  if (accessToken) setAuthorizationHeader(accessToken);

  try {
    const [authStatus, config, documents] = await Promise.all([
      queryClient.ensureQueryData(authStatusQuery()),
      queryClient.ensureQueryData(configQuery()),
      queryClient.ensureQueryData(documentsQuery()),
    ]);

    return { documents, config, authStatus };
  } catch (error) {
    console.log(error);
    if (error instanceof AxiosError && error.response?.status === 401) {
      toast.error(error.response.data.message);
      return redirect('/login');
    }
    toast.error((error as Error).message);
    return null;
  }
};

const AppLayout = () => {
  const { data: config } = useConfig();

  const darkMode = useDarkMode();
  const navigate = useNavigate();

  return (
    <NextUIProvider navigate={navigate}>
      <section  className={`${
          darkMode.value ? 'dark' : ''
        } text-foreground flex flex-col items-center content-center min-h-fit max-w-7xl  mx-auto`}>
           <header className='w-screen'>
        <Navigation />
      </header>
      <section className='flex flex-col gap-5 lg:flex-row justify-center rounded-sm bg-opacity-15 '>
         <aside className='flex md:flex-col gap-4  items-center rounded-sm bg-opacity-15 bg-slate-50 py-10 '>
           <ConfigModal />
           <Button className="p-4 bg-transparent w-full flex justify-start items-center">
            <IconRobotFace stroke={1} className='stroke-primary '/>
            <Link href="/chatgpt"> Chat Bot </Link>
           </Button>
          <span className='border-primary border-b-1 w-11/12 text-primary  pb-2'>
            Documentos 
          </span>

          <DocumentsDropDown />
          <Link href="/documents" color="foreground">
            Documentos
          </Link>
       
       
          <DocumentUploadModal />
       
      

         </aside>
      <main className="sm:mx-3 flex flex-col h-[calc(100vh-100px)] bg-chat-screen p-5 rounded-md lg:w-4/5 mb-5">
         <div className="flex flex-row h-full ">
            <div className="flex flex-col flex-auto h-full p-1 ">
              {!config?.isKeyPresent ? <Navigate to="/config" /> : <Outlet />}
            </div>
          </div>
      </main>
      </section>
     
      <footer></footer>
       
      

      </section>
     
     
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

export default AppLayout;
