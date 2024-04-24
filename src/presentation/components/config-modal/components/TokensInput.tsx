import { Tooltip, Input } from '@nextui-org/react';

import Icon from './Icon';
import { ConfigInputProps } from '../interfaces';

type TokensInputProps = ConfigInputProps & {
  value: string;
};

const Tokens = () => {
  return (
    <div className="px-1 py-2">
      <div className="text-small font-bold">Tokens</div>
      <div className="text-tiny">
        Los tokens son utilizados para pagar el uso de la red neuronal de
        OpenAI.
      </div>
      <div className="text-tiny">
        A más tokens respuestas más largas y mayor costo de la API.
      </div>
    </div>
  );
};
const TokensInput = ({ value, errors, register }: TokensInputProps) => {
  return (
    <>
      <Tooltip content={<Tokens />} className="text-stone-500 w-56">
        <Input
          endContent={<Icon type={'microchip'} />}
          label="Tokens"
          variant="bordered"
          type="number"
          defaultValue={value}
          color="success"
          {...register('maxTokens')}
        />
      </Tooltip>
      {errors && (
        <span className="block w-full mt-0 px-2.5 text-red-500">
          {errors.message}
        </span>
      )}
    </>
  );
};

export default TokensInput;
