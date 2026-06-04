import { action, type Connection, util } from "@prismatic-io/spectral";
import { createClient } from "../client";

const codesOfConductGetAllCodesOfConduct = action({
  display: {
    label: "Codes Of Conduct Get All Codes Of Conduct",
    description: "Get all codes of conduct",
  },
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/codes_of_conduct`);
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
  },
});

const codesOfConductGetConductCode = action({
  display: {
    label: "Codes Of Conduct Get Conduct Code",
    description: "Get a code of conduct",
  },
  perform: async (context, { connection, key }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/codes_of_conduct/${key}`);
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    key: {
      label: "Key",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
    },
  },
});

export default {
  codesOfConductGetAllCodesOfConduct,
  codesOfConductGetConductCode,
};
