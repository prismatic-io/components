import { input } from "@prismatic-io/spectral";
import { connection } from "../common";
import { requesterId } from "./common";

export const deactivateRequesterInputs = {
  connection,
  requesterId: input({
    ...requesterId,
    comments: "Unique ID of the requester to deactivate.",
  }),
};
