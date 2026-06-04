import { type Connection, util } from "@prismatic-io/spectral";
import OpenAI, { AzureOpenAI } from "openai";

export const createClient = (connection: Connection): OpenAI => {
  const {
    fields: { apiKey, organization, isOpenAIKey, apiVersion },
  } = connection;

  if (!apiKey) throw new Error("API Key is required");

  if (util.types.toBool(isOpenAIKey)) {
    return new OpenAI({
      apiKey: util.types.toString(apiKey),
      organization: organization
        ? util.types.toString(organization)
        : undefined,
    });
  }

  if (!organization) throw new Error("Organization is required");
  return new AzureOpenAI({
    apiKey: util.types.toString(apiKey),
    endpoint: `https://${util.types.toString(organization)}.openai.azure.com/`,
    apiVersion: apiVersion
      ? util.types.toString(apiVersion)
      : "2025-01-01-preview",
  });
};
