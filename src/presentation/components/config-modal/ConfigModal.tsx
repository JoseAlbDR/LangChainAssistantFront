import {
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Divider,
  Spinner,
} from '@nextui-org/react';
import ApiKeyInput from './components/ApiKeyInput';
import ModelSelect from './components/ModelSelect';
import TemperatureSlider from './components/TemperatureSlider';
import TokensInput from './components/TokensInput';

import { useConfig } from '../../layouts/useConfig';
import useDarkMode from 'use-dark-mode';

import { ConfigType, configSchema } from '../../../utils';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUpdateConfig } from './useUpdateConfig';

const ConfigModal = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { data, isFetching } = useConfig();
  const darkMode = useDarkMode();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<ConfigType>({
    resolver: zodResolver(configSchema),
  });

  const { mutate, isPending } = useUpdateConfig(onClose);

  const onSubmit: SubmitHandler<ConfigType> = (data) => {
    console.log(data);
    mutate(data);
    reset();
  };

  // const handleSubmit = async (event: FormEvent) => {
  //   event.preventDefault();

  //   const formData = new FormData(event.target as HTMLFormElement);

  //   const openAIApiKey = formData.get('openAIApiKey') as string | undefined;

  //   let configData: Config = {
  //     openAIApiKey,
  //     modelName: (formData.get('modelName') as string) || undefined,
  //     temperature:
  //       parseFloat(formData.get('temperature') as string) || undefined,
  //     maxTokens: parseInt(formData.get('maxTokens') as string) || undefined,
  //   };

  //   if (!openAIApiKey) {
  //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //     const { openAIApiKey, ...rest } = configData;
  //     configData = rest;
  //   }

  //   try {
  //     // Update existing config
  //     if (data?.config) await updateConfig(configData);

  //     queryClient.invalidateQueries({
  //       queryKey: ['config'],
  //     });

  //     toast.success('Configuración actualizada');
  //     navigate('/');
  //   } catch (error) {
  //     handleError(error);
  //   }
  // };

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
        isOpen={!data?.isKeyPresent ? true : isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        className={`${
          darkMode.value ? 'dark' : ''
        } text-foreground bg-background border border-white `}
      >
        <form
          encType="application/json"
          onSubmit={handleSubmit(onSubmit)}
          className="items-center"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Configuración
                </ModalHeader>
                <Divider className="my-1" />
                {isPending || isFetching ? (
                  <Spinner />
                ) : (
                  <ModalBody>
                    <ApiKeyInput
                      register={register}
                      errors={errors.openAIApiKey}
                    />
                    <Divider className="my-1" />
                    {data?.isKeyPresent && (
                      <>
                        <ModelSelect
                          value={data?.config!.modelName}
                          register={register}
                          errors={errors.modelName}
                        />
                        <Divider className="my-1" />
                        <TemperatureSlider
                          value={data?.config!.temperature}
                          control={control}
                        />
                        <Divider className="my-1" />
                        <TokensInput
                          value={String(data?.config!.maxTokens)}
                          register={register}
                          errors={errors.maxTokens}
                        />
                        <Divider className="my-1" />
                      </>
                    )}
                  </ModalBody>
                )}

                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cerrar
                  </Button>
                  <Button className="bg-tertiary text-white" type="submit">
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
