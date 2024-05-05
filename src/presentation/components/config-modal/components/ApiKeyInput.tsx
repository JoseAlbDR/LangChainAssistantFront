import { Input, Link } from '@nextui-org/react';
import Icon from './Icon';
import { ConfigInputProps } from '../interfaces';

const ApiKeyInput = ({ register, errors }: ConfigInputProps) => {
  return (
    <>
      <Input
        endContent={<Icon type={'key'} />}
        label="OpenAI API Key"
        variant="bordered"
        className=" text-primary sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
        type="password"
        {...register('openAIApiKey')}
      />
      {errors && (
        <span className="block w-full mt-0 px-2.5 text-red-500">
          {errors.message}
        </span>
      )}
      <div className="flex items-center justify-between">
        <Link
          href="https://liveconnect.chat/es/obtener-api-key-openai-chatgpt#:~:text=Si%20no%20tienes%20una%20cuenta,%22Create%20new%20API%20key%22."
          size="sm"
          className="font-bold"
          color="success"
          isExternal
        >
          Obtener un API Key de OpenAI
        </Link>
        <Link
          href="https://platform.openai.com/usage"
          size="sm"
          color="success"
          isExternal
          className="font-bold"
        >
          Ver uso
        </Link>
      </div>
    </>
  );
};

export default ApiKeyInput;
