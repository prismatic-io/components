import type { KeySource } from "./KeySource";
import type { ManagedServiceIdentityType } from "./ManagedServiceIdentityType";

export interface CreateOrUpdateNamespacesBody {
  location: string;
  identity?: {
    type?: ManagedServiceIdentityType;
    userAssignedIdentities?: object;
  };
  properties?: {
    alternateName?: string;
    disableLocalAuth?: boolean;
    encryption?: {
      keySource?: KeySource;
      keyVaultProperties?: object[];
      requireInfrastructureEncryption?: boolean;
    };
    privateEndpointConnections?: object[];
    zoneRedundant?: boolean;
  };
  sku?: object;
  tags?: object;
}
