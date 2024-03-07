import { Input, Link } from '@nextui-org/react';
import Icon from './Icon';

const ApiKeyInput = () => {
  return (
    <>
      <Input
        // autoFocus
        endContent={<Icon type={'key'} />}
        label="OpenAI API Key"
        // placeholder="OpenAI API Key"
        variant="bordered"
        type="password"
        name="openAIApiKey"
      />
      <div className="flex items-center justify-between">
        <Link
          href="https://liveconnect.chat/es/obtener-api-key-openai-chatgpt#:~:text=Si%20no%20tienes%20una%20cuenta,%22Create%20new%20API%20key%22."
          size="sm"
          className="text-indigo-500"
          isExternal
        >
          Obtener un API Key de OpenAI
        </Link>
        <Link
          href="https://platform.openai.com/usage"
          size="sm"
          className="text-indigo-500"
          isExternal
        >
          Ver uso
        </Link>
      </div>
    </>
  );
};

export default ApiKeyInput;
