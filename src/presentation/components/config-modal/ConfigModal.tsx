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

interface Config {
  modelName: string;
  temperature: number;
  maxTokens: number;
}

const ConfigModal = ({ config }: { config: Config }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        isIconOnly
        aria-label="config"
        className="p-4 bg-indigo-500"
        onPress={onOpen}
      >
        <span className="fa fa-cog text-3xl text-white"></span>
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
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
                <Button color="primary" onPress={onClose}>
                  Aceptar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ConfigModal;
