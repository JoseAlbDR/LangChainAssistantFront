import { useDocuments } from '../../layouts/useDocuments';
import { Spinner } from '@nextui-org/react';
import DocumentCard from './DocumentCard';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useDocumentsContext } from '../../../context/DocumentsContext';

const DocumentsPage = () => {
  const { data, isFetching } = useDocuments();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { setIsLoading } = useDocumentsContext();

  const handleDelete = async (document: string, onClose: () => void) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `http://localhost:3000/api/document/${document}`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw data;
      }
      toast.success(`Documento ${document} borrado.`);
      queryClient.invalidateQueries({
        queryKey: ['documents'],
      });
      onClose();
      navigate('/documents');
    } catch (error) {
      console.log({ error });
      if (error instanceof Error) return toast.error(error.message);
      if (typeof error === 'string') return toast.error(error);
      return toast.error('Error desconocido, revise los logs');
    } finally {
      setIsLoading(false);
    }
  };

  return isFetching ? (
    <Spinner />
  ) : (
    <div className="flex flex-wrap gap-4 items-center justify-center">
      {data?.map((document) => (
        <DocumentCard
          key={document.name}
          document={document.name}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default DocumentsPage;
