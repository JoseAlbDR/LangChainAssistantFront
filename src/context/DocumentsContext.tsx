import { createContext, useCallback, useContext, useState } from 'react';

interface DocumentsContextValues {
  documentName: string;
  selectedFile: File | null | undefined;
  documents: string[];
  selectedKeys: Set<string>;
  setSelectedKeys: React.Dispatch<React.SetStateAction<Set<string>>>;
  selectFile: (file: File | null) => void;
  saveDocumentName: (name: string) => void;
  saveDocument: (document: string) => void;
  saveDocuments: (document: string[]) => void;
}

const DocumentsContext = createContext<DocumentsContextValues | undefined>(
  undefined
);

function DocumentsProvider({ children }: { children: React.ReactNode }) {
  const [documentName, setDocumentName] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null | undefined>(
    null
  );
  const [documents, setDocuments] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState(new Set(['']));

  const selectFile = (file: File | null) => {
    setSelectedFile(file);
  };

  const saveDocumentName = (name: string) => {
    setDocumentName(name);
  };

  const saveDocument = (document: string) => {
    setDocuments((documents) => [...documents, document]);
  };

  const saveDocuments = useCallback((documents: string[]) => {
    setDocuments(documents);
  }, []);

  return (
    <DocumentsContext.Provider
      value={{
        documentName,
        selectedFile,
        documents,
        selectFile,
        selectedKeys,
        saveDocumentName,
        saveDocument,
        saveDocuments,
        setSelectedKeys,
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
