import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Spinner,
} from '@nextui-org/react';
import { useNavigation, useParams } from 'react-router-dom';
import TrashCan from '../sidebar/TrashCan';
import useDarkMode from 'use-dark-mode';
import { useDeleteHistory } from './useDeleteHistory';

interface Payload {
  bot: string;
  deleteMessages: () => void;
}

export default function DeleteModal({ bot, deleteMessages }: Payload) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const params = useParams();
  const document = params.name;
  const darkMode = useDarkMode();
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  const to = document ? `/${bot}/${document}` : `/${bot}`;
  const { mutate } = useDeleteHistory({ deleteMessages, onClose, to });

  const handleDeleteHistory = async (bot: string) => {
    const baseUrl = `${bot}/chat-history`;

    const url = document ? `${baseUrl}/${document}` : baseUrl;

    mutate(url);
  };

  return (
    <>
      <Button
        onPress={onOpen}
        color="danger"
        isIconOnly
        aria-label="Like"
        className="bg-terciary"
      >
        <TrashCan />
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className={`${
          darkMode.value ? 'dark' : ''
        } text-foreground bg-background border border-primary`}
      >
        <ModalContent>
          {(onClose) => (
            <>
              {isLoading ? (
                <Spinner />
              ) : (
                <>
                  <ModalHeader className="flex flex-col gap-1 text-primary">
                    Borrar Historial
                  </ModalHeader>
                  <ModalBody>
                    <p>¿Seguro que deseas borrar el historial del chat?</p>
                    <small>Esta acción no puede ser deshecha</small>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color="primary"
                      variant="ghost"
                      onPress={onClose}
                      className="hover:text-white"
                    >
                      Cerrar
                    </Button>
                    <Button
                      className="bg-danger text-white"
                      onPress={() => handleDeleteHistory(bot)}
                    >
                      Borrar
                    </Button>
                  </ModalFooter>
                </>
              )}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
