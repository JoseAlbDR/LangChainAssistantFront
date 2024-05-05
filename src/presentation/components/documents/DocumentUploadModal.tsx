import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Spinner,
  ModalFooter,
  useDisclosure,
  Divider,
} from '@nextui-org/react';
import { useDocumentsContext } from '../../../context/DocumentsContext';
import useDarkMode from 'use-dark-mode';
import ChunkSizeSlider from './components/ChunkSizeSlider';
import ChunkOverlapSlider from './components/ChunkOverlapSlider';
import { useUploadDocument } from './useUploadDocument';
import { IconBookUpload } from '@tabler/icons-react';

const DocumentUploadModal = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const {
    selectedFile,
    setIsLoading,
    isLoading,
    selectFile,
    setOverlap,
    setChunkSize,
    overlap,
    chunkSize,
  } = useDocumentsContext();
  const darkMode = useDarkMode();
  const { mutate, isPending } = useUploadDocument(
    onClose,
    selectedFile?.name || ''
  );

  const handleUploadDocument = async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    mutate({ file: selectedFile, chunkOverlap: overlap, chunkSize });
    setIsLoading(false);
  };

  return (
    <>
      <Button
        onPress={onOpen}
        className="bg-transparent w-full flex justify-start items-center"
        radius="sm"
        color="primary"
      >
        <span className="text-primary flex gap-2 items-center text-medium">
          <IconBookUpload stroke={1} className="stroke-primary " /> Añadir...{' '}
        </span>

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
                <ModalHeader className="flex flex-col gap-1 text-primary">
                  Cargar Documento
                </ModalHeader>
                <ModalBody>
                  {isLoading || isPending ? (
                    <Spinner />
                  ) : (
                    <>
                      <input
                        className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                        id="file_input"
                        type="file"
                        onChange={(e) => {
                          return selectFile(e.target.files!.item(0));
                        }}
                      />
                      <Divider className="my-1" />
                      <h2 className="mb-3">Opciones</h2>
                      <ChunkSizeSlider />
                      <ChunkOverlapSlider />
                      <Button
                        onClick={() => {
                          setOverlap(0.2);
                          setChunkSize(1200);
                        }}
                      >
                        Valores por defecto
                      </Button>
                      <Divider className="my-1" />
                    </>
                  )}
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" variant="ghost" onPress={onClose}>
                    Cerrar
                  </Button>
                  <Button
                    variant="solid"
                    color="success"
                    onPress={handleUploadDocument}
                    disabled={isPending}
                  >
                    Subir
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </Button>
    </>
  );
};

export default DocumentUploadModal;
