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
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useNavigation, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import TrashCan from '../sidebar/TrashCan';
import useDarkMode from 'use-dark-mode';
import { deleteHistory } from './service';

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
  const navigate = useNavigate();
  const isLoading = navigation.state === 'loading';
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (data: string) => deleteHistory(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['chatbotHistory'],
      });
      toast.success(data.message);
      const to = document ? `/${bot}/${document}` : `/${bot}`;
      deleteMessages();
      navigate(to);
      onClose();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleDeleteHistory = async (bot: string) => {
    const baseUrl = `${bot}/chat-history`;

    const url = document ? `${baseUrl}/${document}` : baseUrl;

    mutate(url);
  };

  return (
    <>
      <Button
        onPress={onOpen}
        isIconOnly
        aria-label="Like"
        className="bg-terciary"
        color="danger"
      >
        <TrashCan />
      </Button>
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
              {isLoading ? (
                <Spinner />
              ) : (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Borrar Historial
                  </ModalHeader>
                  <ModalBody>
                    <p>¿Seguro que deseas borrar el historial del chat?</p>
                    <small>Esta acción no puede ser deshecha</small>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="default" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button
                      className="bg-tertiary text-white"
                      onPress={() => handleDeleteHistory(bot)}
                    >
                      Action
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
