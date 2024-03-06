import Icon from './Icon';
import { Select, SelectItem, Link } from '@nextui-org/react';

const models = [
  'gpt-3.5-turbo-0125',
  'gpt-3.5-turbo-1106',
  'gpt-4-0125-preview',
  'gpt-4-1106-preview',
];
const ModelSelect = () => {
  return (
    <>
      <Select
        label="Selecciona un modelo"
        endContent={<Icon type={'robot'} />}
        defaultSelectedKeys={['gpt-3.5-turbo-0125']}
        className="w-full text-stone-500"
      >
        {models.map((model) => (
          <SelectItem key={model} value={model} className="text-stone-500">
            {model}
          </SelectItem>
        ))}
      </Select>
      <Link
        href="https://platform.openai.com/docs/models"
        size="sm"
        className="text-indigo-500"
        isExternal
      >
        Modelos OpenAI
      </Link>
    </>
  );
};

export default ModelSelect;
