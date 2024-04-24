import { redirect } from 'react-router-dom';
import { storage } from '../../../utils/storage';
import { CustomError } from '../../../presentation/pages/error/customError';

interface Payload {
  question: string;
  document?: string;
}

export async function* chatStreamGeneratorUseCase(
  payload: Payload,
  endpoint: string
) {
  const accessToken = storage.get('accessToken');

  try {
    const res = await fetch(`http://localhost:3000/api/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const data = await res.json();

      throw new CustomError(data.message, data.statusCode);
    }

    const reader = res.body?.getReader();

    if (!reader) {
      console.log('Error generando reader');
      return null;
    }

    const decoder = new TextDecoder();

    let text = '';

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      const decodedChunk = decoder.decode(value, { stream: true });
      text += decodedChunk;
      yield text;
    }
  } catch (error) {
    console.log(error);
    if (error instanceof CustomError && error.statusCode === 401)
      return redirect('/login');
    throw error;
  }
}

// export const sendUserMessageUseCase = async <T>(
//   question: Payload
// ): Promise<T> => {
//   try {
//     const res = await fetch(
//       'http://localhost:3000/api/chat-bot/user-question',
//       {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(question),
//       }
//     );

//     if (!res.ok) throw new Error('Algo chungo ha pasado');

//     const data = await res.json();

//     return data;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// };
