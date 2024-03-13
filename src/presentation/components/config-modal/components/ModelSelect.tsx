import Icon from './Icon';
import { Select, SelectItem, Link } from '@nextui-org/react';

const models = [
  'gpt-3.5-turbo-0125',
  'gpt-3.5-turbo-1106',
  'gpt-4-0125-preview',
  'gpt-4-1106-preview',
];
const ModelSelect = ({ value }: { value: string }) => {
  return (
    <>
      <Select
        label="Selecciona un modelo"
        endContent={<Icon type={'robot'} />}
        defaultSelectedKeys={[value]}
        color="secondary"
        name="modelName"
      >
        {models.map((model) => (
          <SelectItem key={model} value={model}>
            {model}
          </SelectItem>
        ))}
      </Select>
      <Link
        href="https://platform.openai.com/docs/models"
        size="sm"
        isExternal
        className="font-bold"
        color="success"
      >
        Modelos OpenAI
      </Link>
    </>
  );
};

export default ModelSelect;
