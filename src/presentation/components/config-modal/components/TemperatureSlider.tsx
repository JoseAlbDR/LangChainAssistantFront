import { Tooltip, Slider } from '@nextui-org/react';

import Icon from './Icon';

const Temperature = () => {
  return (
    <div className="px-1 py-2">
      <div className="text-small font-bold">Temperatura</div>
      <div className="text-tiny">
        En el contexto de la API de OpenAI, “temperatura” se refiere a un
        parámetro que se puede ajustar en algunos modelos de generación de
        lenguaje natural, como GPT-3.5. La temperatura controla la creatividad y
        la aleatoriedad de las respuestas generadas por el modelo.
      </div>
    </div>
  );
};

const TemperatureSlider = ({ value }: { value: number }) => {
  return (
    <Tooltip content={<Temperature />} className="text-stone-500 w-56">
      <Slider
        label="Temperatura"
        step={0.1}
        maxValue={1}
        minValue={0}
        defaultValue={value}
        className="max-w-md"
        endContent={<Icon type={'thermometer-full'} />}
        name="temperature"
        color="success"
      />
    </Tooltip>
  );
};

export default TemperatureSlider;
