export const getDocuments = async () => {
  const response = await fetch('http://localhost:3000/api/document');

  if (!response.ok) throw new Error('Error fetching documents');

  console.log('documents');

  const data = await response.json();

  return data;
};

export const getConfig = async () => {
  const response = await fetch('http://localhost:3000/api/openai-config');

  if (!response.ok) throw new Error('Error fetching config');

  const data = await response.json();

  return data;
};
