import Markdown from 'react-markdown';
import { TypingLoader } from '..';
import { IconMessageChatbot } from '@tabler/icons-react';

interface Props {
  text: string;
}

const GptMessage = ({ text }: Props) => {
  return (
    <div className="col-start-1 sm:col-end-9 col-end-12 p-3 rounded-lg ">
      <div className="flex flex-row items-start">

        <div className="flex items-center justify-center flex-shrink-0 text-white">
          <IconMessageChatbot stroke={1} className='stroke-primary size-10' />
        </div>
        {text === '' ? (
          <TypingLoader />
        ) : (
          <div className="relative ml-3 text-medium bg-black bg-opacity-15 pt-3 pb-2 px-4 rounded-md">
            <Markdown>{text}</Markdown>
          </div>
        )}
      </div>
    </div>
  );
};

export default GptMessage;
