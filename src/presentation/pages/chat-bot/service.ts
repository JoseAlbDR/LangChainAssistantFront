export const getHistory = async () => {
  try {
    const response = await fetch(
      'http://localhost:3000/api/chatgpt/chat-history'
    );

    if (!response.ok) {
      const data = await response.json();
      throw data;
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
