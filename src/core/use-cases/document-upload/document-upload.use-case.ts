interface Payload {
  file: File;
}

export const documentUploadUseCase = async ({ file }: Payload) => {
  if (file.type !== 'application/pdf' && file.type !== 'text/plain')
    throw new Error(
      `Invalid file type ${file.type} valid types are: .pdf and .text`
    );

  const formData = new FormData();
  formData.append('document', file);

  try {
    const res = await fetch(
      'http://localhost:3000/api/chat-bot/feed-document',
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!res.ok) {
      const { message } = await res.json();
      throw new Error(message);
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};
