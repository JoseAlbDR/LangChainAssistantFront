import { Tooltip, Input } from '@nextui-org/react';

import Icon from './Icon';

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
const TokensInput = () => {
  return (
    <Tooltip content={<Tokens />} className="text-stone-500 w-56">
      <Input
        endContent={<Icon type={'microchip'} />}
        label="Tokens"
        variant="bordered"
        type="number"
        defaultValue="250"
      />
    </Tooltip>
  );
};

export default TokensInput;
