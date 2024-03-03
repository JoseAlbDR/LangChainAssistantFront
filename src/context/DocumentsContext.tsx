import { createContext, useContext, useState } from 'react';

interface DocumentsContextValues {
  documentName: string;
  selectedFile: File | null | undefined;
  selectFile: (file: File | null) => void;
  saveDocumentName: (name: string) => void;
}

const DocumentsContext = createContext<DocumentsContextValues | undefined>(
  undefined
);

function DocumentsProvider({ children }: { children: React.ReactNode }) {
  const [documentName, setDocumentName] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null | undefined>(
    null
  );

  const selectFile = (file: File | null) => {
    setSelectedFile(file);
  };

  const saveDocumentName = (name: string) => {
    setDocumentName(name);
  };

  return (
    <DocumentsContext.Provider
      value={{
        documentName,
        selectedFile,
        selectFile,
        saveDocumentName,
      }}
    >
      {children}
    </DocumentsContext.Provider>
  );
}

const useDocumentsContext = () => {
  const context = useContext(DocumentsContext);

  if (context === undefined)
    throw new Error('Documents context was used outside of DocumentsProvider');

  return context;
};

export { DocumentsProvider, useDocumentsContext };
