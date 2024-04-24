import { client } from '../../../api/client';

interface Payload {
  file: File;
  chunkSize: number;
  chunkOverlap: number;
}

export const documentUpload = async ({
  file,
  chunkSize,
  chunkOverlap,
}: Payload) => {
  if (file.type !== 'application/pdf' && file.type !== 'text/plain')
    throw new Error(
      `Invalid file type ${file.type} valid types are: .pdf and .text`
    );

  const formData = new FormData();
  formData.append('document', file);
  formData.append('chunkSize', String(chunkSize));
  const overlap = chunkSize * chunkOverlap;
  formData.append('chunkOverlap', String(overlap));

  const { data } = await client.post('/document', formData);

  return data;
};
