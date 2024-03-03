import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  useDisclosure,
} from '@nextui-org/react';
import { FormEvent, useState } from 'react';
import { documentUploadUseCase } from '../../../core/use-cases/document-upload/document-upload.use-case';
import { toast } from 'react-toastify';
import { useDocumentsContext } from '../../../context/DocumentsContext';

interface Props {
  onSendMessage: (message: string, document: string) => void;
  placeholder?: string;
  disableCorrections?: boolean;
  accept?: string; //image*
}

const TextMessageBoxFile = ({
  onSendMessage,
  placeholder = '',
  disableCorrections = false,
}: // accept,
Props) => {
  const {
    documentName,
    selectedFile,
    saveDocumentName,
    selectFile,
    saveDocument,
  } = useDocumentsContext();
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleUploadDocument = async (onClose: () => void) => {
    if (!selectedFile) return;

    saveDocumentName(selectedFile.name);

    try {
      setIsLoading(true);
      await documentUploadUseCase({ file: selectedFile });
      toast.success('Carga realizada con éxito!');
      saveDocument(selectedFile.name);
      saveDocumentName(selectedFile.name);
      onClose();
    } catch (error) {
      if (error instanceof Error) return toast.error(error.message);
      if (typeof error === 'string') return toast.error(error);
      return toast.error('Error desconocido, revise los logs');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSendMessage(message, documentName);
    setMessage('');
    selectFile(null);
  };

  return (
    <form
      onSubmit={handleSendMessage}
      className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4"
      encType="multipart/form-data"
    >
      <div className="mr-3">
        <Button onPress={onOpen}>
          <i className="fa-solid fa-paperclip text-xl"></i>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1 text-blue-800">
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
                    <Button color="danger" variant="light" onPress={onClose}>
                      Cerrar
                    </Button>
                    <Button
                      color="primary"
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
      <div className="flex-grow">
        <div className="relative w-full">
          <input
            type="text"
            autoFocus
            name="message"
            className="flex w-full border rounded-xl text-gray-800 focus:outline-none focus:border-purple-300 pl-4 h-14 text-xl"
            placeholder={placeholder}
            autoComplete={!disableCorrections ? 'off' : 'on'}
            autoCorrect={!disableCorrections ? 'off' : 'on'}
            spellCheck={!disableCorrections ? 'false' : 'true'}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
      </div>
      <div className="ml-4">
        <button className="btn-primary" disabled={false}>
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              <span className="mr-2 ">Enviar</span>{' '}
              <i className="fa-regular fa-paper-plane"></i>
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default TextMessageBoxFile;
