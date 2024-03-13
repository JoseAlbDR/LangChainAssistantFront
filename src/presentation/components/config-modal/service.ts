import { Config } from '../../../interfaces';

export const createConfig = async (configData: Config) => {
  await fetch('http://localhost:3000/api/openai-config', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(configData),
  });
};

export const updateConfig = async (configData: Config) => {
  await fetch('http://localhost:3000/api/openai-config', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(configData),
  });
};
