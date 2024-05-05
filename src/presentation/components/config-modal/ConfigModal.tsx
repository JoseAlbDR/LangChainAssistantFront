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

import { ConfigType, ModelEnum, configSchema } from '../../../utils';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUpdateConfig } from './useUpdateConfig';
import { useEffect } from 'react';
import { IconAdjustments } from '@tabler/icons-react';

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
    defaultValues: {
      openAIApiKey: '',
      maxTokens: data?.config.maxTokens || 250,
      temperature: data?.config.temperature || 0.7,
      modelName: (data?.config.modelName as ModelEnum) || ModelEnum.gpt350,
    },
  });

  useEffect(() => {
    if (data) {
      reset({
        openAIApiKey: '',
        maxTokens: data.config.maxTokens || 250,
        temperature: data.config.temperature || 0.7,
        modelName: (data.config.modelName as ModelEnum) || ModelEnum.gpt350,
      });
    }
  }, [data, reset]);

  const { mutate, isPending } = useUpdateConfig(onClose);

  const onSubmit: SubmitHandler<ConfigType> = (data) => {
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
        aria-label="config"
        className="bg-transparent w-full flex justify-start items-center"
        onPress={onOpen}
        radius="sm"
        color="primary"
      >
        <span className="text-primary flex gap-2 items-center text-medium">
          <IconAdjustments stroke={1} className="stroke-primary " />{' '}
          Configuración
        </span>
      </Button>

      <Modal
        isOpen={!data?.isKeyPresent ? true : isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        className={`${
          darkMode.value ? 'dark' : ''
        }  text-foreground bg-background border border-primary `}
      >
        <form
          encType="application/json"
          onSubmit={handleSubmit(onSubmit)}
          className="items-center"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1  text-primary">
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
                  <Button
                    color="secondary"
                    variant="ghost"
                    onPress={onClose}
                    className="hover:text-white"
                  >
                    Cerrar
                  </Button>
                  <Button variant="solid" type="submit" color="success">
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
