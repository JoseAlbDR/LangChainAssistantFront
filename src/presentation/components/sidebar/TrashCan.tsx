import { Button } from '@nextui-org/react';

const TrashCan = () => {
  return (
    <div className="flex justify-center items-center bg-gray-800 rounded-md p-2 transition-colors ">
      <Button isIconOnly color="danger" aria-label="Like">
        <span className="fa-solid fa-trash text-2xl" />
      </Button>
    </div>
  );
};

export default TrashCan;
