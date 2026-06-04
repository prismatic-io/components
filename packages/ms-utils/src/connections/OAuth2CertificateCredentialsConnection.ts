import { connection, templateConnectionInputs } from "@prismatic-io/spectral";
import type {
  CertificateCredentialParams,
  ConnectionAuth,
} from "../interfaces/ConnectionParams/CertificateCredentialsParams";

const _getMicrosoftCertificateCredentialsConnection = ({
  key,
  defaultScopes,
  comments,
  additionalInputs,
}: CertificateCredentialParams) =>
  connection({
    key,
    display: {
      label: "Certificate Credentials",
      description:
        "Authenticates actions in all Microsoft's Graph API services.",
    },
    inputs: templateConnectionInputs(
      {
        baseUrl: {
          label: "Base URL",
          placeholder: "https://graph.microsoft.com",
          example: "https://graph.microsoft.com",
          default: "https://graph.microsoft.com",
          type: "string",
          required: true,
          shown: true,
          comments:
            "The base URL for the Microsoft Graph API. Depending on your cloud environment, you can choose the correct one [here](https://learn.microsoft.com/en-us/graph/deployments#microsoft-graph-and-graph-explorer-service-root-endpoints).",
        },
        entraIdEndpoint: {
          label: "Microsoft Entra ID Endpoint",
          type: "string",
          required: true,
          shown: true,
          comments:
            "The Microsoft Entra ID endpoint for the Microsoft Graph API. You can find this in the Azure portal or [here](https://learn.microsoft.com/en-us/graph/deployments#app-registration-and-token-service-root-endpoints).",
          example: "https://login.microsoftonline.com",
          default: "https://login.microsoftonline.com",
          placeholder: "https://login.microsoftonline.com",
        },
        tenant: {
          label: "Tenant",
          type: "string",
          required: true,
          shown: true,
          comments:
            comments?.tenantId ||
            "The tenant ID or name for the Microsoft Graph API. This is the ID or name of the tenant that you are connecting to.",
          example: "11111111-2222-3333-4444-555555555555",
          placeholder: "Enter your tenant ID or name",
        },
        clientId: {
          label: "Client ID",
          placeholder: "Client ID",
          type: "string",
          required: true,
          shown: true,
          comments:
            comments?.clientId || "Client Id of your Azure application.",
          example: "11111111-2222-3333-4444-555555555555",
        },
        certificate: {
          label: "Private Certificate",
          type: "text",
          required: true,
          shown: true,
          comments: "Your X.509 private certificate.",
        },
        certificateThumbprint: {
          label: "Certificate Thumbprint",
          type: "string",
          required: true,
          shown: true,
          comments: "Thumbprint of the certificate.",
        },
        scopes: {
          label: "Scopes",
          placeholder: "https://graph.microsoft.com/.default",
          type: "string",
          required: false,
          shown: true,
          comments: comments?.scopes || "Microsoft Graph API Scopes.",
          default: defaultScopes || "https://graph.microsoft.com/.default",
        },
        ...(additionalInputs || {}),
      },
      {},
    ),
  });

export const getMicrosoftCertificateCredentialsConnection: (
  params: CertificateCredentialParams,
) => ConnectionAuth = _getMicrosoftCertificateCredentialsConnection;
