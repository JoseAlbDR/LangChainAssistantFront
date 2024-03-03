import { Outlet, useLoaderData } from 'react-router-dom';
// import { menuRoutes } from '../../router/router';
// import SidebarItem from '../components/sidebar/SidebarItem';
import { DocumentsDropDown } from '../components';
import { toast } from 'react-toastify';
import { useDocumentsContext } from '../../context/DocumentsContext';
import { useEffect } from 'react';

export const loader = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/chat-bot/documents');

    const documents = await res.json();

    return documents;
  } catch (error) {
    console.log(error);
    toast.error('Error loading documents');
  }
};

const DashboardLayout = () => {
  const documents = useLoaderData() as [{ name: string }];
  const { saveDocuments } = useDocumentsContext();

  console.log(documents);

  useEffect(() => {
    saveDocuments(documents.map((document) => document.name));
  }, [documents, saveDocuments]);

  return (
    <main className="flex flex-row mt-7">
      <nav className="hidden sm:flex flex-col ml-5 w-[370px] min-h-[calc(100vh-3.0rem)] bg-white bg-opacity-10 p-5 rounded-3xl">
        <h1 className="font-bold text-lg lg:text-3xl bg-gradient-to-br from-white via-white/50 bg-clip-text text-transparent">
          Chat Bot<span className="text-indigo-500"></span>
        </h1>
        <span className="text-xl text-stone-300">Bienvenido!</span>

        <div className="border-gray-700 border my-3" />

        {/* {menuRoutes.map((item) => (
          <SidebarItem key={item.to} {...item} />
        ))} */}
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
