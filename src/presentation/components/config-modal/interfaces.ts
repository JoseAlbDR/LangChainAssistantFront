import { UseFormRegister, FieldError } from 'react-hook-form';
import { ModelEnum } from '../../../utils';

export interface ConfigInputProps {
  register: UseFormRegister<{
    openAIApiKey: string;
    modelName: ModelEnum;
    temperature: number;
    maxTokens: number;
  }>;
  errors: FieldError | undefined;
}
