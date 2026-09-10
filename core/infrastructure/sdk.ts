import FormsEasySDK from '@hnndes-ou/forms-easy-sdk';

export const createClient = (apiKey: string, modelName = 'menu') => {
  return new FormsEasySDK({
    authToken: apiKey,
    modelName,
  });
};

export const validateApiKey = async (apiKey: string): Promise<boolean> => {
  const tempClient = createClient(apiKey);
  try {
    await tempClient.count();
    return true;
  } catch {
    return false;
  }
};
