import {
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
  Selection,
  Spinner,
} from '@nextui-org/react';
import { useMemo } from 'react';
import { useDocumentsContext } from '../../../context/DocumentsContext';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { documentsQuery } from '../../layouts/useDocuments';

interface Document {
  name: string;
}

const DocumentsDropDown = () => {
  const { selectedKeys, setSelectedKeys } = useDocumentsContext();
  const { saveDocumentName } = useDocumentsContext();

  const { data: documents, isLoading } = useQuery<Document[]>(documentsQuery());
  const navigate = useNavigate();

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(', ').replaceAll('_', ' '),
    [selectedKeys]
  );

  const handleSelectDocument = (document: string) => {
    navigate(`document-assistant/${document}`);
    saveDocumentName(document);
  };

  const cutName = (document: string) => {
    if (document.length > 15) return document.slice(0, 15) + '...';
    return document;
  };

  if (isLoading) return <Spinner />;

  if (!documents) return <div>No hay documentos, prueba a subir uno.</div>;

  return (
    <Dropdown className="light text-foreground bg-background">
      <DropdownTrigger>
        <Button variant="bordered" className=" text-white">
          {`Documento: ${cutName(selectedValue) || 'Seleccionar'} `}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Single selection example"
        variant="flat"
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
