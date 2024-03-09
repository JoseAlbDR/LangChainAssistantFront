import { Button } from '@nextui-org/react';
import { FormEvent, useState } from 'react';
import DeleteModal from '../delete-modal/DeleteModal';

interface Props {
  onSendMessage: (message: string) => void;
  placeholder?: string;
  disableCorrections?: boolean;
}

const TextMessageBox = ({
  onSendMessage,
  placeholder = '',
  disableCorrections = false,
}: Props) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (message.trim().length === 0) return;

    onSendMessage(message);
    setMessage('');
  };

  return (
    <form
      onSubmit={handleSendMessage}
      className="flex flex-row items-center justify-center h-16 rounded-xl w-full px-4"
    >
      <div className="flex-grow">
        <div className="relative w-full bg-primary p-2 bg-opacity-25 rounded-md flex gap-1 shadow-xl">
          <DeleteModal />
          <input
            type="text"
            autoFocus
            name="question"
            className="flex w-full border rounded-xl focus:outline-none focus:border-purple-300 pl-4 h-10 "
            placeholder={placeholder}
            autoComplete={!disableCorrections ? 'off' : 'on'}
            autoCorrect={!disableCorrections ? 'off' : 'on'}
            spellCheck={!disableCorrections ? 'false' : 'true'}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className="">
            <Button
              className="bg-tertiary min-w-10 min-h-fit sm:w-20"
              type="submit"
            >
              <span className="mr-2 hidden sm:block text-white">Send</span>
              <i className=" fa-regular fa-paper-plane text-white"></i>
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default TextMessageBox;
