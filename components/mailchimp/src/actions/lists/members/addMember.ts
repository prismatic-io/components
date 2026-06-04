import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import {
  listId,
  email,
  language,
  status,
  emailType,
  mergeFields,
  tags,
  interests,
  vip,
  connectionInput,
} from "../../../inputs";

export const addMember = action({
  display: {
    label: "Add Member",
    description: "Add a new member to a list",
  },
  perform: async (context, params) => {
    const client = await createClient(params.connection, context.debug.enabled);
    const { data } = await client.post(`/lists/${params.listId}/members`, {
      email_address: params.email,
      ...(params.emailType && { email_type: params.emailType }),
      status: params.status,
      ...(Object.keys(params.mergeFields).length > 0 && {
        merge_fields: params.mergeFields,
      }),
      ...(Object.keys(params.interests).length > 0 && {
        interests: params.interests,
      }),
      ...(params.language && { language: params.language }),
      vip: params.vip,
      ...(params.tags.length > 0 && { tags: params.tags }),
    });
    return { data };
  },
  inputs: {
    listId,
    email,
    language: { ...language, required: false },
    status,
    emailType,
    mergeFields,
    tags,
    interests,
    vip,
    connection: connectionInput,
  },
});

export default addMember;
