import { useDocuments } from '../../layouts/useDocuments';
import { Spinner } from '@nextui-org/react';
import DocumentCard from './DocumentCard';

import { useDocumentsContext } from '../../../context/DocumentsContext';

import { useDeleteDocument } from './useDeleteDocument';
import DocumentUploadModal from '../../components/documents/DocumentUploadModal';

const DocumentsPage = () => {
  const { data, isFetching } = useDocuments();

  const { setIsLoading } = useDocumentsContext();

  const { mutate, isPending } = useDeleteDocument();

  const handleDelete = async (id: string, onClose: () => void) => {
    setIsLoading(true);
    mutate({ id, onClose });
    setIsLoading(false);
  };

  return isFetching || isPending ? (
    <Spinner />
  ) : (
    <div className="grid grid-cols-12 gap-5 items-center justify-start p-10">
      {data?.length === 0 ? (
        <div className="flex flex-col gap-2 w-[150px]">
          <p>Aun no hay documentos</p>
          <DocumentUploadModal />
        </div>
      ) : (
        data?.map((document) => (
          <DocumentCard
            key={document.name}
            document={document.name}
            id={document.id}
            onDelete={handleDelete}
          />
        ))
      )}
    </div>
  );
};

export default DocumentsPage;
