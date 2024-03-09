import React from 'react';
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
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate, useNavigation } from 'react-router-dom';
import { toast } from 'react-toastify';
import TrashCan from '../sidebar/TrashCan';
import { useChatContext } from '../../../context/ChatContext';

interface Payload {
  bot: string;
}

export default function DeleteModal({ bot }: Payload) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { emptyMessages } = useChatContext();

  const navigation = useNavigation();
  const navigate = useNavigate();

  const isLoading = navigation.state === 'loading';

  const queryClient = useQueryClient();

  const handleDeleteHistory = async (bot: string, onClose: () => void) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/${bot}/chat-history`,
        {
          method: 'DELETE',
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw data;
      }

      queryClient.invalidateQueries({
        queryKey: ['chatbotHistory'],
      });
      emptyMessages();

      toast.success(data.message);
      navigate(`/${bot}`);
      onClose();
    } catch (error) {
      if (error instanceof Error) return toast.error(error.message);
      if (typeof error === 'string') return toast.error(error);
      return toast.error('Error desconocido, revise los logs');
    }
  };

  return (
    <>
      <Button
        onPress={onOpen}
        isIconOnly
        aria-label="Like"
        className="bg-terciary"
      >
        <TrashCan />
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="text-foreground bg-background"
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
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button
                      color="primary"
                      onPress={() => handleDeleteHistory(bot, onClose)}
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
