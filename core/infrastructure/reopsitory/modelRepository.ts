import type FormsEasySDK from "@hnndes-ou/forms-easy-sdk";
import { createClient } from "../sdk";

export const createModelClient = (apiKey: string, modelName = 'menu'): FormsEasySDK | null => {
  if (!apiKey) return null;
  return createClient(apiKey, modelName);
};
