import { Slider, Tooltip } from '@nextui-org/react';
import { useDocumentsContext } from '../../../../context/DocumentsContext';

const ChunkOverlap = () => {
  return (
    <div className="px-1 py-2">
      <div className="text-small font-bold">Chunk Overlap</div>
      <div className="text-tiny">
        <p>
          Independientemente del tamaño del 'Chunk', se recomienda generalmente
          un solapamiento del 10-20% para capturar información contextual en los
          límites.
        </p>
        <p>
          Si tus textos contienen información contextual importante en los
          límites, o si desea capturar las dependencias entre fragmentos
          adyacentes de manera más exhaustiva, puede aumentar el tamaño del
          solapamiento al 30-50% del tamaño del fragmento.
        </p>
      </div>
    </div>
  );
};

const ChunkOverlapSlider = () => {
  const { overlap, setOverlap } = useDocumentsContext();

  return (
    <Tooltip content={<ChunkOverlap />} className="text-stone-500 w-56">
      <Slider
        label="Chunk Overlap"
        step={0.01}
        maxValue={1}
        minValue={0}
        defaultValue={0.2}
        value={overlap}
        formatOptions={{ style: 'percent' }}
        className="max-w-md"
        name="temperature"
        color="success"
        onChange={(percentage) => setOverlap(percentage as number)}
      />
    </Tooltip>
  );
};

export default ChunkOverlapSlider;
