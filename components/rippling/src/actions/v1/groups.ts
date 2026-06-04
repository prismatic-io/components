import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { API_VERSION } from "../../constants";
import {
  deleteGroupsGroupIdExamplePayload,
  getGroupsExamplePayload,
  patchGroupsGroupIdExamplePayload,
  postGroupsExamplePayload,
  putGroupsGroupIdExamplePayload,
} from "../../examplePayloads";
import {
  deleteGroupsGroupIdInputs,
  getGroupsInputs,
  patchGroupsGroupIdInputs,
  postGroupsInputs,
  putGroupsGroupIdInputs,
} from "../../inputs";

const getGroups = action({
  display: {
    label: "Get Groups (V1)",
    description: "GET Groups.",
  },
  inputs: getGroupsInputs,
  examplePayload: getGroupsExamplePayload,
  perform: async (context, { connection }) => {
    const client = createClient(
      connection,
      API_VERSION.V1,
      context.debug.enabled,
    );
    const { data } = await client.get("/groups");
    return { data };
  },
});

const postGroups = action({
  display: {
    label: "Post Groups (V1)",
    description: "POST Groups.",
  },
  inputs: postGroupsInputs,
  examplePayload: postGroupsExamplePayload,
  perform: async (context, { connection, name, spokeId, users }) => {
    const client = createClient(
      connection,
      API_VERSION.V1,
      context.debug.enabled,
    );
    const { data } = await client.post("/groups", { name, spokeId, users });
    return { data };
  },
});

const putGroupsGroupId = action({
  display: {
    label: "Put Groups Group Id (V1)",
    description: "PUT Group.",
  },
  inputs: putGroupsGroupIdInputs,
  examplePayload: putGroupsGroupIdExamplePayload,
  perform: async (
    context,
    { connection, groupId, name, spokeId, users, version },
  ) => {
    const client = createClient(
      connection,
      API_VERSION.V1,
      context.debug.enabled,
    );
    const { data } = await client.put(`/groups/${groupId}`, {
      name,
      spokeId,
      users,
      version,
    });
    return { data };
  },
});

const patchGroupsGroupId = action({
  display: {
    label: "Patch Groups Group Id (V1)",
    description: "PATCH Group.",
  },
  inputs: patchGroupsGroupIdInputs,
  examplePayload: patchGroupsGroupIdExamplePayload,
  perform: async (
    context,
    { connection, groupId, name, spokeId, users, version },
  ) => {
    const client = createClient(
      connection,
      API_VERSION.V1,
      context.debug.enabled,
    );
    const { data } = await client.patch(`/groups/${groupId}`, {
      name,
      spokeId,
      users,
      version,
    });
    return { data };
  },
});

const deleteGroupsGroupId = action({
  display: {
    label: "Delete Groups Group Id (V1)",
    description: "DELETE Group.",
  },
  inputs: deleteGroupsGroupIdInputs,
  examplePayload: deleteGroupsGroupIdExamplePayload,
  perform: async (context, { connection, groupId }) => {
    const client = createClient(
      connection,
      API_VERSION.V1,
      context.debug.enabled,
    );
    const { data } = await client.delete(`/groups/${groupId}`);
    return { data };
  },
});

export default {
  getGroups,
  postGroups,
  putGroupsGroupId,
  patchGroupsGroupId,
  deleteGroupsGroupId,
};
