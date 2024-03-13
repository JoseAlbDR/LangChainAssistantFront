import { createContext, useCallback, useContext, useState } from 'react';

interface DocumentsContextValues {
  selectedFile: File | null | undefined;
  documents: string[];
  selectedKeys: Set<string>;
  setSelectedKeys: React.Dispatch<React.SetStateAction<Set<string>>>;
  isLoading: boolean;
  chunkSize: number;
  overlap: number;
  selectFile: (file: File | null) => void;
  saveDocument: (document: string) => void;
  saveDocuments: (document: string[]) => void;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setChunkSize: React.Dispatch<React.SetStateAction<number>>;
  setOverlap: React.Dispatch<React.SetStateAction<number>>;
}

const DocumentsContext = createContext<DocumentsContextValues | undefined>(
  undefined
);

function DocumentsProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null | undefined>(
    null
  );
  const [documents, setDocuments] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState(new Set(['']));
  const [chunkSize, setChunkSize] = useState(1200);
  const [overlap, setOverlap] = useState(0.2);

  const selectFile = (file: File | null) => {
    setSelectedFile(file);
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
        selectedFile,
        documents,
        selectFile,
        selectedKeys,
        saveDocument,
        saveDocuments,
        setSelectedKeys,
        isLoading,
        setIsLoading,
        chunkSize,
        setChunkSize,
        overlap,
        setOverlap,
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
