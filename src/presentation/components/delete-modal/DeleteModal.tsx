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
import { useNavigation } from 'react-router-dom';
import { toast } from 'react-toastify';
import TrashCan from '../sidebar/TrashCan';

export default function DeleteModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const navigation = useNavigation();

  const isLoading = navigation.state === 'loading';

  const queryClient = useQueryClient();

  const handleDeleteHistory = async () => {
    try {
      const response = await fetch(
        'http://localhost:3000/api/assistant/chat-history',
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

      toast.success(data);
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
        className='isIconOnly color="danger" aria-label="Like"'
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
                    <Button color="primary" onPress={handleDeleteHistory}>
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
