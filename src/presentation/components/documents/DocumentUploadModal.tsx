import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Spinner,
  ModalFooter,
  useDisclosure,
} from '@nextui-org/react';
import { useDocumentsContext } from '../../../context/DocumentsContext';
import { documentUploadUseCase } from '../../../core/use-cases/document-upload/document-upload.use-case';
import { toast } from 'react-toastify';
import { queryClient } from '../../../router/router';
import { useNavigate } from 'react-router-dom';
import useDarkMode from 'use-dark-mode';

const DocumentUploadModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { selectedFile, setIsLoading, saveDocument, isLoading, selectFile } =
    useDocumentsContext();
  const navigate = useNavigate();
  const darkMode = useDarkMode();

  const handleUploadDocument = async (onClose: () => void) => {
    if (!selectedFile) return;

    try {
      setIsLoading(true);
      await documentUploadUseCase({ file: selectedFile });
      toast.success('Carga realizada con éxito!');
      queryClient.invalidateQueries({
        queryKey: ['documents'],
      });
      saveDocument(selectedFile.name);
      navigate(`/assistant/${selectedFile.name}`);
      onClose();
    } catch (error) {
      if (error instanceof Error) return toast.error(error.message);
      if (typeof error === 'string') return toast.error(error);
      return toast.error('Error desconocido, revise los logs');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="z-50 flex h-full items-center">
      <Button
        onPress={onOpen}
        className="flex justify-center items-center rounded-md p-2 transition-colors h-full  border-stone-300 border-medium bg-background text-foreground"
      >
        <i className="fa-solid fa-plus text-xl text-stone-300"></i>
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          className={`${
            darkMode.value ? 'dark' : ''
          } text-foreground bg-background border border-white`}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Cargar Documento
                </ModalHeader>
                <ModalBody>
                  {isLoading ? (
                    <Spinner />
                  ) : (
                    <input
                      className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                      id="file_input"
                      type="file"
                      onChange={(e) => {
                        console.log(e.target.files);
                        return selectFile(e.target.files!.item(0));
                      }}
                    />
                  )}
                </ModalBody>
                <ModalFooter>
                  <Button color="default" variant="light" onPress={onClose}>
                    Cerrar
                  </Button>
                  <Button
                    className="bg-tertiary text-white"
                    onPress={() => handleUploadDocument(onClose)}
                  >
                    Subir
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </Button>
    </div>
  );
};

export default DocumentUploadModal;
