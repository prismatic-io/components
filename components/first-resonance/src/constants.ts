import { gql } from "graphql-tag";

export const AUTH_SERVERS = [
  {
    authEndpoint:
      "https://staging-auth.ion-aus.com/realms/api-keys/protocol/openid-connect/token",
    apiUrl: "https://api-staging-aus.buildwithion.com/graphql",
  },
  {
    authEndpoint:
      "https://auth.ion-aus.com/auth/realms/api-keys/protocol/openid-connect/token",
    apiUrl: "https://api-production-aus.buildwithion.com/graphql",
  },
  {
    authEndpoint:
      "https://auth.buildwithion.com/auth/realms/api-keys/protocol/openid-connect/token",
    apiUrl: "https://api.buildwithion.com/graphql",
  },
  {
    authEndpoint:
      "https://staging-auth.buildwithion.com/realms/api-keys/protocol/openid-connect/token",
    apiUrl: "https://staging-api.buildwithion.com/graphql",
  },
  {
    authEndpoint:
      "https://auth.ion-gov.com/auth/realms/api-keys/protocol/openid-connect/token",
    apiUrl: "https://api.ion-gov.com/graphql",
  },
  {
    authEndpoint:
      "https://staging-auth.ion-gov.com/realms/api-keys/protocol/openid-connect/token",
    apiUrl: "https://staging-api.ion-gov.com/graphql",
  },
  {
    authEndpoint:
      "https://auth-dev-pub.buildwithion.com/realms/api-keys/protocol/openid-connect/token",
    apiUrl: "https://api-dev-pub.buildwithion.com/graphql",
  },
];

export const CREATE_PO = gql`
  mutation createPO($input: CreatePurchaseOrderInput!) {
    createPurchaseOrder(input: $input) {
      purchaseOrder {
        id
        _etag
        currency {
          id
        }
        currencyId
      }
    }
  }
`;
