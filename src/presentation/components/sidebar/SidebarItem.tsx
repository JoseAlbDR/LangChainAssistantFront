import { NavLink } from 'react-router-dom';
import { MenuItem } from '../../../interfaces/MenuItem';
import DocumentClip from '../documents/DocumentClip';
import TrashCan from './TrashCan';

const SidebarItem = ({ to, icon, title, description }: MenuItem) => {
  return (
    <div className="flex content-between items-center w-full">
      <NavLink
        key={to}
        to={to}
        className={({ isActive }) =>
          isActive
            ? 'flex justify-center items-center bg-gray-800 rounded-md p-2 transition-colors w-full '
            : 'flex justify-center items-center hover:bg-gray-800 rounded-md p-2 transition-colors w-full '
        }
      >
        <i className={`${icon} text-2xl mr-4 text-indigo-400`}></i>
        <div className="flex flex-col flex-grow">
          <span className="text-stone-300 text-lg font-semibold">{title}</span>
          <span className="text-gray-400 text-sm">{description}</span>
        </div>
      </NavLink>
      {title === 'Documentos' && <DocumentClip />}
      {title === 'Chat Bot' && <TrashCan />}
    </div>
  );
};

export default SidebarItem;
