import type { Connection } from "@prismatic-io/spectral";
import { util } from "@prismatic-io/spectral";
import { createClient } from "@prismatic-io/spectral/dist/clients/http";

export const getSessionId = async (connection: Connection, debug: boolean) => {
  const { region: baseUrl, email, password, workspaceId } = connection.fields;

  const { data } = await createClient({
    baseUrl: util.types.toString(baseUrl),
    debug,
  }).post("/v1/login", {
    email,
    password,
    workspaceId,
  });
  return data.arenaSessionId;
};
