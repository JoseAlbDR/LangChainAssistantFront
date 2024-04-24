import { client } from '../../../api/client';
import { Config } from '../../../interfaces';

export const createConfig = async (configData: Config) => {
  await client.post('/openai-config', configData);
};

export const updateConfig = async (configData: Config) => {
  await client.put('/openai-config', configData);
};
