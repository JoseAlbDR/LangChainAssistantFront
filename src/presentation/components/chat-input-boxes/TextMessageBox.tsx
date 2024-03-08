import { Button } from '@nextui-org/react';
import { FormEvent, useState } from 'react';

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
      className="flex flex-row items-center h-16 rounded-xl w-full px-4"
    >
      <div className="flex-grow">
        <div className="relative w-full">
          <input
            type="text"
            autoFocus
            name="question"
            className="flex w-full border rounded-xl focus:outline-none focus:border-purple-300 pl-4 h-10"
            placeholder={placeholder}
            autoComplete={!disableCorrections ? 'off' : 'on'}
            autoCorrect={!disableCorrections ? 'off' : 'on'}
            spellCheck={!disableCorrections ? 'false' : 'true'}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
      </div>
      <div className="ml-4">
        <Button className="btn-primary" type="submit">
          <span className="mr-2 hidden sm:block text-white">Send</span>
          <i className=" fa-regular fa-paper-plane text-white"></i>
        </Button>
      </div>
    </form>
  );
};

export default TextMessageBox;
