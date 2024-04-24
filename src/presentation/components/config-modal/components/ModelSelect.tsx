import Icon from './Icon';
import { Select, SelectItem, Link } from '@nextui-org/react';
import { ConfigInputProps } from '../interfaces';

const models = [
  'gpt-3.5-turbo-0125',
  'gpt-3.5-turbo-1106',
  'gpt-4-0125-preview',
  'gpt-4-1106-preview',
];

type ModelSelectProps = ConfigInputProps & {
  value: string;
};

const ModelSelect = ({ value, register, errors }: ModelSelectProps) => {
  return (
    <>
      <Select
        label="Selecciona un modelo"
        endContent={<Icon type={'robot'} />}
        defaultSelectedKeys={[value]}
        color="secondary"
        {...register('modelName')}
      >
        {models.map((model) => (
          <SelectItem key={model} value={model}>
            {model}
          </SelectItem>
        ))}
      </Select>
      {errors && (
        <span className="block w-full mt-0 px-2.5 text-red-500">
          {errors.message}
        </span>
      )}
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
