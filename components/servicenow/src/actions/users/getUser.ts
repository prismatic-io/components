import { action } from "@prismatic-io/spectral";
import {
  apiVersionInput,
  connection,
  instanceUrlInput,
  sysId,
} from "../../inputs";
import { getTableRecord } from "../tables/records/getTableRecord";

export const getUser = action({
  display: {
    label: "Get User by Id",
    description: "Gets a User by their Id",
  },
  perform: async (context, parameters) => {
    return {
      data: await getTableRecord.perform(context, {
        tableNameInput: "sys_user",
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
