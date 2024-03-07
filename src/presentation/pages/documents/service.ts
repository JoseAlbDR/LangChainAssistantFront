export const getDocumentHistory = async (document: string) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/assistant/chat-history/${document}`
    );

    if (!response.ok) {
      const data = await response.json();
      console.log({ data });
      throw data;
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
