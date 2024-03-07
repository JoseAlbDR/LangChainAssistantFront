import { Outlet, useLoaderData } from 'react-router-dom';
import { menuRoutes } from '../../router/router';
import SidebarItem from '../components/sidebar/SidebarItem';
import { ConfigModal, DocumentsDropDown } from '../components';
import { toast } from 'react-toastify';
import { useDocumentsContext } from '../../context/DocumentsContext';
import { useEffect } from 'react';

interface LoaderData {
  documents: Document[];
  config: Config;
}

export interface Config {
  modelName: string;
  temperature: number;
  maxTokens: number;
}

interface Document {
  name: string;
}

export const loader = async () => {
  try {
    const [documentRes, configRes] = await Promise.all([
      fetch('http://localhost:3000/api/document'),
      fetch('http://localhost:3000/api/openai-config'),
    ]);

    if (!configRes.ok) toast.error('Error fetching config');
    if (!documentRes.ok) toast.error('Error fetching documents');

    const documents = await documentRes.json();
    const config = await configRes.json();

    return { documents, config };
  } catch (error) {
    console.log(error);
    toast.error('Error fetching data from server');
  }
};

const DashboardLayout = () => {
  const { documents, config } = useLoaderData() as LoaderData;
  const { saveDocuments } = useDocumentsContext();

  useEffect(() => {
    saveDocuments(documents.map((document: Document) => document.name));
  }, [documents, saveDocuments]);

  return (
    <main className="flex flex-row mt-7">
      <nav className="hidden sm:flex flex-col ml-5 w-[370px] min-h-[calc(100vh-3.0rem)] bg-white bg-opacity-10 p-5 rounded-3xl">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-lg lg:text-3xl from-white">
            Chat Bot
            <span className="text-indigo-500"></span>
          </h1>
          <ConfigModal config={config} />
        </div>
        <span className="text-xl text-stone-300">Bienvenido!</span>

        <div className="border-gray-700 border my-3" />

        {menuRoutes.map((item) => (
          <SidebarItem key={item.to} {...item} />
        ))}
        <DocumentsDropDown />
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
