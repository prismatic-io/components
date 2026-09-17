import { inputs as httpClientInputs } from "@prismatic-io/spectral/dist/clients/http";
import {
  apiVersionInput,
  connection,
  instanceUrlInput,
  sysId,
  tableNameInput,
} from "./common";
const { url: _, debugRequest: __, ...restHttpInputs } = httpClientInputs;
export const rawRequestInputs = {
  connection,
  instanceUrlInput,
  apiVersionInput,
  tableNameInput,
  sysId: {
    ...sysId,
    required: false,
  },
  ...restHttpInputs,
};
