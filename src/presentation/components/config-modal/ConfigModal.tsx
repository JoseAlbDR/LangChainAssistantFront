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
import { useNavigate } from 'react-router-dom';

interface Config {
  openAIApiKey?: string;
  modelName: string;
  temperature: number;
  maxTokens: number;
}

const ConfigModal = ({ config }: { config: Config }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);

    const openAIApiKey = formData.get('openAIApiKey') as string | undefined;

    let configData: Config = {
      openAIApiKey,
      modelName: formData.get('modelName') as string,
      temperature: parseFloat(formData.get('temperature') as string),
      maxTokens: parseInt(formData.get('maxTokens') as string),
    };

    if (!openAIApiKey) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { openAIApiKey, ...rest } = configData;
      configData = rest;
    }

    try {
      const response = await fetch('http://localhost:3000/api/openai-config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(configData),
      });

      if (!response.ok) throw new Error('Error saving configuration');

      toast.success('Configuración actualizada');
      navigate('/');
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
        className="p-4 bg-indigo-500"
        onPress={onOpen}
        onClick={() => navigate('config')}
      >
        <span className="fa fa-cog text-3xl text-white"></span>
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <form encType="application/json" onSubmit={handleSubmit}>
          <ModalContent className="text-indigo-500">
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Configuración
                </ModalHeader>
                <Divider className="my-1" />
                <ModalBody>
                  <ApiKeyInput />
                  <Divider className="my-1" />
                  <ModelSelect value={config!.modelName} />
                  <Divider className="my-1" />
                  <TemperatureSlider value={config!.temperature} />
                  <Divider className="my-1" />
                  <TokensInput value={String(config!.maxTokens)} />
                  <Divider className="my-1" />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cerrar
                  </Button>
                  <Button color="primary" onPress={onClose} type="submit">
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
