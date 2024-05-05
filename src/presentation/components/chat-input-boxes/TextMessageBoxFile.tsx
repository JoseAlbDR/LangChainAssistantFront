import { Button, Spinner } from '@nextui-org/react';
import { FormEvent, useRef, useState } from 'react';
import { useDocumentsContext } from '../../../context/DocumentsContext';
import { useParams } from 'react-router-dom';
import DeleteModal from '../delete-modal/DeleteHistoryModal';
import { IconSend2 } from '@tabler/icons-react';

interface Props {
  onSendMessage: (message: string, document: string) => void;
  placeholder?: string;
  disableCorrections?: boolean;
  accept?: string; //image*
  onDeleteMessages: () => void;
}

const TextMessageBoxFile = ({
  onSendMessage,
  placeholder = '',
  disableCorrections = false,
  onDeleteMessages,
}: // accept,
Props) => {
  const { selectFile, isLoading } = useDocumentsContext();
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const params = useParams();

  const handleSendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (params && params.name) onSendMessage(message, params.name);

    setMessage('');
    inputRef.current?.focus();
    selectFile(null);
  };

  return (
    <form
      onSubmit={handleSendMessage}
      className="flex flex-row items-center justify-center  w-full border-primary rounded-none border-t-1 bg-opacity-15 bg-black px-5 py-4 "
      encType="multipart/form-data"
    >
      <div className="flex-grow">
        <div className="relative w-full bg-transparent rounded-md flex gap-2">
          <DeleteModal bot={'assistant'} deleteMessages={onDeleteMessages} />
          <input
            ref={inputRef}
            type="text"
            autoFocus
            name="message"
            className="flex w-full focus:outline-none focus:border-purple-300 pl-4  bg-transparent text-foreground  placeholder:text-foreground"
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
                className="bg-transparent min-w-10  sm:w-20"
                type="submit"
              >
                <IconSend2 stroke={2} className="stroke-foreground" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

export default TextMessageBoxFile;
