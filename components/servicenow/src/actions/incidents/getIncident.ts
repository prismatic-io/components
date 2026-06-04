import { action } from "@prismatic-io/spectral";
import {
  apiVersionInput,
  connection,
  instanceUrlInput,
  sysId,
} from "../../inputs";
import { getTableRecord } from "../tables/records/getTableRecord";

export const getIncident = action({
  display: {
    label: "Get Incident",
    description: "Gets an Incident by ID",
  },
  perform: async (context, parameters) => {
    return {
      data: await getTableRecord.perform(context, {
        tableNameInput: "incident",
        ...parameters,
      }),
    };
  },
  inputs: {
    connection,
    instanceUrlInput,
    apiVersionInput,
    sysId,
  },
});
