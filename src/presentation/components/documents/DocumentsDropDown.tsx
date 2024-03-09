import {
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
  Selection,
  Spinner,
} from '@nextui-org/react';
import { useEffect, useMemo } from 'react';
import { useDocumentsContext } from '../../../context/DocumentsContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { documentsQuery } from '../../layouts/useDocuments';
import useDarkMode from 'use-dark-mode';

interface Document {
  name: string;
}

const DocumentsDropDown = () => {
  const { selectedKeys, setSelectedKeys } = useDocumentsContext();
  const params = useParams();
  const { data: documents, isLoading } = useQuery<Document[]>(documentsQuery());
  const navigate = useNavigate();
  const darkMode = useDarkMode();

  useEffect(() => {
    if (params && params.name) return setSelectedKeys(new Set([params.name]));
    setSelectedKeys(new Set(['']));
  }, [params, setSelectedKeys]);

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(', ').replaceAll('_', ' '),
    [selectedKeys]
  );

  const handleSelectDocument = (document: string) => {
    navigate(`assistant/${document}`);
  };

  const cutName = (document: string) => {
    if (document.length > 25) return document.slice(0, 25) + '...';
    return document;
  };

  if (isLoading) return <Spinner />;

  if (!documents) return <div>No hay documentos, prueba a subir uno.</div>;

  return (
    <Dropdown
      className={`${
        darkMode.value ? 'dark' : ''
      } text-foreground bg-background border border-white`}
    >
      <DropdownTrigger>
        <Button variant="ghost">
          {`${cutName(selectedValue) || 'Seleccionar Documento'} `}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Single selection example"
        // variant="faded"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys as (keys: Selection) => void}
      >
        {documents.map((document) => (
          <DropdownItem
            key={document.name}
            className="lowercase"
            onPress={() => handleSelectDocument(document.name)}
          >
            {document.name}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default DocumentsDropDown;
