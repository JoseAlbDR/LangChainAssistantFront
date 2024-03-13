import { Tooltip, Slider } from '@nextui-org/react';
import { useDocumentsContext } from '../../../../context/DocumentsContext';

const ChunkSize = () => {
  return (
    <div className="px-1 py-2">
      <div className="text-small font-bold">Chunk Size</div>
      <div className="text-tiny">
        <p>
          Los valores en el rango de 500-1,200 tokens son adecuados para
          documentos de longitud promedio (unas cuantos páginas) y logran un
          equilibrio entre capturar el contexto y la eficiencia computacional.
          El valor predeterminado está establecido en 1,200 tokens, que es un
          buen punto de partida para la mayoría de los casos de uso.
        </p>
        <p>
          Los valores en el rango de 2,000-4,000 tokens son adecuados para
          documentos largos (10+ páginas). Los documentos más largos son más
          costosos computacionalmente, pero el contexto adicional puede resultar
          en respuestas mejores.
        </p>
      </div>
    </div>
  );
};

const ChunkSizeSlider = () => {
  const { chunkSize, setChunkSize } = useDocumentsContext();
  return (
    <Tooltip content={<ChunkSize />} className="text-stone-500 w-56">
      <Slider
        label="Chunk Size"
        step={10}
        maxValue={5000}
        minValue={500}
        defaultValue={1200}
        value={chunkSize}
        className="max-w-md"
        name="temperature"
        color="success"
        onChange={(value) => setChunkSize(value as number)}
      />
    </Tooltip>
  );
};

export default ChunkSizeSlider;
