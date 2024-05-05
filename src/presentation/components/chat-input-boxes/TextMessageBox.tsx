import { Button } from '@nextui-org/react';
import { FormEvent, useRef, useState } from 'react';
import DeleteModal from '../delete-modal/DeleteHistoryModal';
import { IconSend2 } from '@tabler/icons-react';

interface Props {
  onSendMessage: (message: string) => void;
  placeholder?: string;
  disableCorrections?: boolean;
  onDeleteMessages: () => void;
  isLoading: boolean;
}

const TextMessageBox = ({
  onSendMessage,
  placeholder = '',
  disableCorrections = false,
  onDeleteMessages,
  isLoading,
}: Props) => {
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (message.trim().length === 0) return;

    onSendMessage(message);
    inputRef.current?.focus();
    setMessage('');
  };

  return (
    <form
      onSubmit={handleSendMessage}
      className="flex flex-row items-center justify-center  w-full border-primary rounded-none border-t-1 bg-opacity-15 bg-black px-5 py-4 "
    >
      <div className="flex-grow ">
        <div className="relative w-full bg-transparent rounded-md flex gap-2">
          <DeleteModal bot={'chatgpt'} deleteMessages={onDeleteMessages} />
          <input
            ref={inputRef}
            type="text"
            autoFocus
            name="question"
            className="flex w-full focus:outline-none focus:border-purple-300 pl-4  bg-transparent text-foreground "
            placeholder={placeholder}
            autoComplete={!disableCorrections ? 'off' : 'on'}
            autoCorrect={!disableCorrections ? 'off' : 'on'}
            spellCheck={!disableCorrections ? 'false' : 'true'}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className="">
            <Button
              className="bg-transparent min-w-10  sm:w-20"
              type="submit"
              disabled={isLoading}
            >
              <IconSend2 stroke={2} className='stroke-foreground'/>
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default TextMessageBox;
