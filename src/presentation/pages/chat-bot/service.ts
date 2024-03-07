export const getHistory = async () => {
  const response = await fetch(
    'http://localhost:3000/api/chatgpt/chat-history'
  );

  if (!response.ok) throw new Error(await response.json());

  const data = await response.json();

  return data;
};

