import { client } from '../../../api/client';
import { Config } from '../../../interfaces';
import { ConfigType } from '../../../utils';

export const createConfig = async (configData: Config) => {
  await client.post('/openai-config', configData);
};

export const updateConfig = async (configData: ConfigType) => {
  await client.put('/openai-config', configData);
};
