import { input } from "@prismatic-io/spectral";
import { connection } from "../common";
import { applicationId } from "./common";

export const getSoftwareInputs = {
  connection,
  applicationId: input({
    ...applicationId,
    comments: "Unique ID of the software to retrieve.",
  }),
};
