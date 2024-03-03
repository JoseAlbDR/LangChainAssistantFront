import {
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
} from '@nextui-org/react';
import { useState, useMemo } from 'react';

const DocumentsDropDown = () => {
  const [selectedKeys, setSelectedKeys] = useState(new Set(['']));

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(', ').replaceAll('_', ' '),
    [selectedKeys]
  );

  return (
    <Dropdown className="light text-foreground bg-background">
      <DropdownTrigger>
        <Button variant="bordered" className="capitalize text-white">
          {`Documentos: ${selectedValue || 'Seleccionar'} `}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Single selection example"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
      >
        {/* <DropdownItem key="text">Text</DropdownItem>
        <DropdownItem key="number">Number</DropdownItem>
        <DropdownItem key="date">Date</DropdownItem>
        <DropdownItem key="single_date">Single Date</DropdownItem>
        <DropdownItem key="iteration">Iteration</DropdownItem> */}
      </DropdownMenu>
    </Dropdown>
  );
};

export default DocumentsDropDown;
