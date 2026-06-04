import { action } from "@prismatic-io/spectral";
import { createHttpClient } from "../../client";
import { listAttachableExamplePayload as examplePayload } from "../../examplePayloads/attachables";
import {
  attachableEntityId,
  attachableEntityType,
  connectionInput,
} from "../../inputs";

export const listAttachments = action({
  display: {
    label: "List Attachments",
    description: "Retrieve a list of all Attachments linked to an entity.",
  },
  perform: async (
    context,
    { quickbooksConnection, attachableEntityType, attachableEntityId },
  ) => {
    const client = createHttpClient(
      quickbooksConnection,
      context.debug.enabled,
    );

    const queryString = `select * from Attachable where AttachableRef.EntityRef.Type = '${attachableEntityType}' and AttachableRef.EntityRef.value = '${attachableEntityId}'`;
    

    const { data } = await client.get(`/query?query=${queryString}`);

    const attachments = data.QueryResponse?.Attachable || [];
    return {
      data: attachments,
    };
  },
  inputs: {
    attachableEntityType,
    attachableEntityId,
    quickbooksConnection: connectionInput,
  },
  examplePayload,
});
