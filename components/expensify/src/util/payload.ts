import { URLSearchParams } from "node:url";
import { type Connection, util } from "@prismatic-io/spectral";
import { FORM_FIELDS, JOB_TYPES } from "../constants";

export const generatePayload = (
  data: Record<string, unknown>,
  connection: Connection,
): URLSearchParams => {
  const { partnerUserID, partnerUserSecret } = connection.fields;
  const json = {
    credentials: {
      partnerUserID: util.types.toString(partnerUserID),
      partnerUserSecret: util.types.toString(partnerUserSecret),
    },
    type: JOB_TYPES.GET,
    ...data,
  };
  const params = new URLSearchParams();
  params.append(FORM_FIELDS.REQUEST_JOB_DESCRIPTION, JSON.stringify(json));
  return params;
};
