import {
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Divider,
} from '@nextui-org/react';
import ApiKeyInput from './ApiKeyInput';
import ModelSelect from './ModelSelect';
import TemperatureSlider from './TemperatureSlider';
import TokensInput from './TokensInput';
import { toast } from 'react-toastify';
import { FormEvent } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useConfig } from '../../layouts/useConfig';
import useDarkMode from 'use-dark-mode';
import { useNavigate } from 'react-router-dom';

interface Config {
  openAIApiKey?: string;
  modelName: string | undefined;
  temperature: number | undefined;
  maxTokens: number | undefined;
}

const ConfigModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { data: config } = useConfig();
  const queryClient = useQueryClient();
  const darkMode = useDarkMode();
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);

    const openAIApiKey = formData.get('openAIApiKey') as string | undefined;

    console.log({ openAIApiKey });

    let configData: Config = {
      openAIApiKey,
      modelName: (formData.get('modelName') as string) || undefined,
      temperature:
        parseFloat(formData.get('temperature') as string) || undefined,
      maxTokens: parseInt(formData.get('maxTokens') as string) || undefined,
    };

    if (!openAIApiKey) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { openAIApiKey, ...rest } = configData;
      configData = rest;
    }

    try {
      // Initial config
      if (!config) {
        console.log({ configData });
        await fetch('http://localhost:3000/api/openai-config', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(configData),
        });
        navigate('/');
      }

      // Update existing config
      if (config)
        await fetch('http://localhost:3000/api/openai-config', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(configData),
        });

      queryClient.invalidateQueries({
        queryKey: ['config'],
      });
      toast.success('Configuración actualizada');
    } catch (error) {
      console.log(error);
      if (error instanceof Error) return toast.error(error.message);
      if (typeof error === 'string') return toast.error(error);
      toast.error('Unknown error, check logs');
    }
  };

  return (
    <>
      <Button
        isIconOnly
        aria-label="config"
        className="p-4 bg-primary bg-opacity-50"
        onPress={onOpen}
      >
        <span className="fa fa-cog text-3xl text-white"></span>
      </Button>

      <Modal
        isOpen={!config ? true : isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        className={`${
          darkMode.value ? 'dark' : ''
        } text-foreground bg-background border border-white `}
      >
        <form
          encType="application/json"
          onSubmit={handleSubmit}
          className="items-center"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Configuración
                </ModalHeader>
                <Divider className="my-1" />
                <ModalBody>
                  <ApiKeyInput />
                  <Divider className="my-1" />
                  {config && (
                    <>
                      <ModelSelect value={config!.modelName} />
                      <Divider className="my-1" />
                      <TemperatureSlider value={config!.temperature} />
                      <Divider className="my-1" />
                      <TokensInput value={String(config!.maxTokens)} />
                      <Divider className="my-1" />
                    </>
                  )}
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cerrar
                  </Button>
                  <Button
                    className="bg-tertiary text-white"
                    onPress={onClose}
                    type="submit"
                  >
                    Aceptar
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

export default ConfigModal;
