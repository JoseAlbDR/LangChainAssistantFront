import {
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
  Selection,
} from '@nextui-org/react';
import { useMemo } from 'react';
import { useDocumentsContext } from '../../../context/DocumentsContext';
import { useNavigate } from 'react-router-dom';

const DocumentsDropDown = () => {
  const { selectedKeys, setSelectedKeys } = useDocumentsContext();
  const { documents, saveDocumentName } = useDocumentsContext();
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
            key={document}
            className="lowercase"
            onPress={() => handleSelectDocument(document)}
          >
            {document}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default DocumentsDropDown;
