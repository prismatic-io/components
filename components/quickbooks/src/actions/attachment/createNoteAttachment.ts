import { action } from "@prismatic-io/spectral";
import { createHttpClient } from "../../client";
import {
  connectionInput,
  entityRefType,
  entityRefValue,
  includeOnSend,
  minorVersion,
  note,
} from "../../inputs";

export const createNoteAttachment = action({
  display: {
    label: "Create Note Attachment",
    description: "Attach a note to an object.",
  },
  perform: async (
    context,
    {
      connection,
      entityRefValue,
      entityRefType,
      note,
      minorVersion,
      includeOnSend,
    },
  ) => {
    const client = createHttpClient(connection, context.debug.enabled);
    const body: Record<string, unknown> = {
      Note: note,
    };

    const attachableRef: Array<object> = [];

    if (entityRefType || entityRefValue) {
      attachableRef.push({
        IncludeOnSend: includeOnSend,
        EntityRef: {
          ...(entityRefType && { type: entityRefType }),
          ...(entityRefValue && { value: entityRefValue }),
        },
      });

      body.AttachableRef = attachableRef;
    }
    const { data } = await client.post("/attachable", body, {
      params: { minorversion: minorVersion },
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    entityRefValue,
    entityRefType,
    note: { ...note, required: true },
    minorVersion: { ...minorVersion, default: "75" },
    includeOnSend,
  },
});
