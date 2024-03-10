import { useDocuments } from '../../layouts/useDocuments';
import { Spinner } from '@nextui-org/react';
import DocumentCard from './DocumentCard';

const DocumentsPage = () => {
  const { data, isFetching } = useDocuments();

  return (
    <div className="flex flex-wrap gap-4 items-center justify-center">
      {isFetching && <Spinner />}
      {data?.map((document) => (
        <DocumentCard key={document.name} document={document.name} />
      ))}
    </div>
  );
};

export default DocumentsPage;
