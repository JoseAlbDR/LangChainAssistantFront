import { Button, Spinner } from '@nextui-org/react';
import { FormEvent, useState } from 'react';
import { useDocumentsContext } from '../../../context/DocumentsContext';
import { useParams } from 'react-router-dom';
import DeleteModal from '../delete-modal/DeleteHistoryModal';

interface Props {
  onSendMessage: (message: string, document: string) => void;
  placeholder?: string;
  disableCorrections?: boolean;
  accept?: string; //image*
}

const TextMessageBoxFile = ({
  onSendMessage,
  placeholder = '',
  disableCorrections = false,
}: // accept,
Props) => {
  const { selectFile, isLoading } = useDocumentsContext();
  const [message, setMessage] = useState('');

  const params = useParams();

  const handleSendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (params && params.name) onSendMessage(message, params.name);

    setMessage('');
    selectFile(null);
  };

  return (
    <form
      onSubmit={handleSendMessage}
      className="flex flex-row items-center justify-center h-16 rounded-xl w-full px-4"
      encType="multipart/form-data"
    >
      <div className="flex-grow">
        <div className="relative w-full bg-primary p-2 bg-opacity-25 rounded-md flex gap-1 shadow-xl">
          <DeleteModal bot={'chatgpt'} />
          <input
            type="text"
            autoFocus
            name="message"
            className="flex w-full border rounded-xl focus:outline-none focus:border-purple-300 pl-4 h-10 "
            placeholder={placeholder}
            autoComplete={!disableCorrections ? 'off' : 'on'}
            autoCorrect={!disableCorrections ? 'off' : 'on'}
            spellCheck={!disableCorrections ? 'false' : 'true'}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={isLoading}
          />
          <div className="">
            {isLoading ? (
              <Spinner />
            ) : (
              <Button
                className="bg-tertiary min-w-10 min-h-fit sm:w-20"
                type="submit"
              >
                <span className="mr-2 hidden sm:block text-white">Send</span>
                <i className=" fa-regular fa-paper-plane text-white"></i>
              </Button>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

export default TextMessageBoxFile;
