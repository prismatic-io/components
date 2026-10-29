import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getAzureServiceBusClient } from "../client";
import { createOrUpdateNamespacesExamplePayload } from "../examplePayloads";
import {
  alternateName,
  connection,
  disableLocalAuth,
  identityType,
  keySource,
  keyVaultProperties,
  location,
  namespaceName,
  privateEndpointConnections,
  requireInfrastructureEncryption,
  resourceGroupName,
  sku,
  subscriptionId,
  tags,
  userAssignedIdentities,
  zoneRedundant,
} from "../inputs";
import type { CreateOrUpdateNamespacesBody } from "../types/CreateOrUpdateNamespacesBody";
import type { KeySource } from "../types/KeySource";
import type { ManagedServiceIdentityType } from "../types/ManagedServiceIdentityType";

export const createOrUpdateNamespaces = action({
  display: {
    label: "Create or Update Namespaces",
    description:
      "Creates or updates a service namespace. Once created, this namespace's resource manifest is immutable. This operation is idempotent.",
  },
  examplePayload: createOrUpdateNamespacesExamplePayload,
  perform: async (
    context,
    {
      connection,
      namespaceName,
      resourceGroupName,
      subscriptionId,
      location,
      identityType,
      userAssignedIdentities,
      alternateName,
      disableLocalAuth,
      keySource,
      keyVaultProperties,
      requireInfrastructureEncryption,
      privateEndpointConnections,
      zoneRedundant,
      sku,
      tags,
    },
  ) => {
    const client = getAzureServiceBusClient(connection, context.debug.enabled);
    try {
      const body: CreateOrUpdateNamespacesBody = {
        location,
        identity: {
          ...(identityType.length && {
            type: identityType as ManagedServiceIdentityType,
          }),
          ...(userAssignedIdentities.length && {
            userAssignedIdentities: JSON.parse(userAssignedIdentities),
          }),
        },
        properties: {
          ...(alternateName.length && { alternateName }),
          disableLocalAuth,
          ...(keySource.length &&
            keyVaultProperties.length && {
              encryption: {
                ...(keySource.length && { keySource: keySource as KeySource }),
                ...(keyVaultProperties.length && {
                  keyVaultProperties: JSON.parse(keyVaultProperties),
                }),
                requireInfrastructureEncryption,
              },
            }),
          ...(privateEndpointConnections.length && {
            privateEndpointConnections: JSON.parse(privateEndpointConnections),
          }),
          zoneRedundant,
        },
        ...(sku.length && { sku: JSON.parse(sku) }),
        ...(tags.length && { tags: JSON.parse(tags) }),
      };
      const { data } = await client.put(
        `/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/${namespaceName}?api-version=2021-11-01`,
        body,
      );
      return { data };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },
  inputs: {
    connection,
    namespaceName,
    resourceGroupName,
    subscriptionId,
    location,
    identityType,
    userAssignedIdentities,
    alternateName,
    disableLocalAuth,
    keySource,
    keyVaultProperties,
    requireInfrastructureEncryption,
    privateEndpointConnections,
    zoneRedundant,
    sku,
    tags,
  },
});

export default { createOrUpdateNamespaces };
