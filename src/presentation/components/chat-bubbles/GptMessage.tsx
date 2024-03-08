import Markdown from 'react-markdown';
import { TypingLoader } from '..';

interface Props {
  text: string;
}

const GptMessage = ({ text }: Props) => {
  return (
    <div className="col-start-1 sm:col-end-9 col-end-12 p-3 rounded-lg ">
      <div className="flex flex-row items-start">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-600 flex-shrink-0 text-white">
          G
        </div>
        {text === '' ? (
          <TypingLoader />
        ) : (
          <div className="relative ml-3 text-medium bg-primary bg-opacity-25 pt-3 pb-2 px-4 shadow rounded-xl text-white">
            <Markdown>{text}</Markdown>
          </div>
        )}
      </div>
    </div>
  );
};

export default GptMessage;
