interface Payload {
  file: File;
}

export const documentUploadUseCase = async ({ file }: Payload) => {
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

    if (!res.ok) throw new Error('Error uploading document');
  } catch (err) {
    console.log(err);
  }
};
