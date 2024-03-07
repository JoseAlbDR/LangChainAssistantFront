export const getDocumentHistory = async (document: string) => {
  const response = await fetch(
    `http://localhost:3000/api/assistant/chat-history/${document}`
  );

  if (!response.ok) throw new Error(await response.json());

  const data = await response.json();

  return data;
};
