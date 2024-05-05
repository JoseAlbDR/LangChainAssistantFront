import { IconUser } from "@tabler/icons-react";

interface Props {
  text: string;
}

const MyMessage = ({ text }: Props) => {
  return (
    <div className="sm:col-start-5 col-start-1 col-end-13 p-3 rounded-lg">
      <div className="flex items-center justify-start flex-row-reverse">
        <IconUser stroke={1} className='stroke-primary size-10' />
        <div className="relative ml-3 text-medium bg-black bg-opacity-15 pt-3 pb-2 px-4 rounded-md">
          <span className="break-all">{text}</span>
        </div>
      </div>
    </div>
  );
};

export default MyMessage;
