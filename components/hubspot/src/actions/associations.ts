import { action } from "@prismatic-io/spectral";
import { getHubspotClient } from "../client";
import {
  archiveAssociationsPayload,
  createAssociationsPayload,
  listAssociationTypesPayload,
  readAssociationsPayload,
} from "../examplePayloads";
import {
  associateType,
  connectionInput,
  fromId,
  fromObjectType,
  timeout,
  toId,
  toObjectType,
} from "../inputs";

export const listAssociationTypes = action({
  display: {
    label: "List Association Types",
    description: "Retrieve a list of all association types available between two objects",
  },
  perform: async (context, params) => {
    const debugRequest = context.debug.enabled;
    const client = getHubspotClient({
      hubspotConnection: params.hubspotConnection,
      timeout: params.timeout,
      debugRequest,
    });
    
    return {
      data: (
        await client.get(
          `/crm/v3/associations/${params.fromObjectType}/${params.toObjectType}/types`,
        )
      ).data,
    };
  },
  inputs: {
    hubspotConnection: connectionInput,
    fromObjectType,
    toObjectType,
    timeout,
  },
  examplePayload: listAssociationTypesPayload,
});

export const createAssociations = action({
  display: {
    label: "Create Association",
    description: "Create an association between the objects identified in the step",
  },
  perform: async (
    context,
    { fromObjectType, toObjectType, fromId, toId, associateType, timeout, hubspotConnection },
  ) => {
    const debugRequest = context.debug.enabled;
    const client = getHubspotClient({
      hubspotConnection,
      timeout,
      debugRequest,
    });

    return {
      data: (
        await client.post(`/crm/v3/associations/${fromObjectType}/${toObjectType}/batch/create`, {
          inputs: [
            {
              from: {
                id: fromId,
              },
              to: {
                id: toId,
              },
              type: associateType,
            },
          ],
        })
      ).data,
    };
  },
  inputs: {
    fromObjectType,
    toObjectType,
    fromId,
    toId,
    associateType,
    timeout,
    hubspotConnection: connectionInput,
  },
  examplePayload: createAssociationsPayload,
});

export const readAssociations = action({
  display: {
    label: "Read Association",
    description: "Get the Ids of the objects associated with those specified in the step",
  },
  perform: async (
    context,
    { fromObjectType, toObjectType, fromId, timeout, hubspotConnection },
  ) => {
    const debugRequest = context.debug.enabled;
    const client = getHubspotClient({
      hubspotConnection,
      timeout,
      debugRequest,
    });

    return {
      data: (
        await client.post(`/crm/v3/associations/${fromObjectType}/${toObjectType}/batch/read`, {
          inputs: [
            {
              id: fromId,
            },
          ],
        })
      ).data,
    };
  },
  inputs: {
    fromObjectType,
    toObjectType,
    fromId,
    timeout,
    hubspotConnection: connectionInput,
  },
  examplePayload: readAssociationsPayload,
});

export const ArchiveAssociations = action({
  display: {
    label: "Archive Association",
    description: "Remove the associations between two provided objects",
  },
  perform: async (
    context,
    { fromObjectType, toObjectType, fromId, toId, associateType, timeout, hubspotConnection },
  ) => {
    const debugRequest = context.debug.enabled;
    const client = getHubspotClient({
      hubspotConnection,
      timeout,
      debugRequest,
    });

    return {
      data: (
        await client.post(`/crm/v3/associations/${fromObjectType}/${toObjectType}/batch/archive`, {
          inputs: [
            {
              from: {
                id: fromId,
              },
              to: {
                id: toId,
              },
              type: associateType,
            },
          ],
        })
      ).data,
    };
  },
  inputs: {
    fromObjectType,
    toObjectType,
    fromId,
    toId,
    associateType,
    timeout,
    hubspotConnection: connectionInput,
  },
  examplePayload: archiveAssociationsPayload,
});
