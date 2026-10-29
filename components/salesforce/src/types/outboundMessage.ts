export interface WorkflowOutboundMessageMetadata {
  apiVersion: number;
  fields: string[];
  includeSessionId: boolean;
  integrationUser: string;
  name: string;
  protected: boolean;
  urls: string[] | null;
  useDeadLetterQueue: boolean;
  description: string | null;
  endpointUrl: string;
}

export interface WorkflowOutboundMessage {
  attributes: {
    type: string;
    url: string;
  };
  Id: string;
  Name: string;
  IntegrationUserId: string;
  CreatedDate: string;
  CreatedById: string;
  LastModifiedDate: string;
  LastModifiedById: string;
  ManageableState: string;
  NamespacePrefix: string;
  ApiVersion: number;
  EntityDefinitionId: string;
  Metadata: WorkflowOutboundMessageMetadata;
  FullName: string;
}

export interface SalesforceOutboundEnvelope {
  "soapenv:Envelope": {
    "@_xmlns:soapenv": string;
    "@_xmlns:xsd": string;
    "@_xmlns:xsi": string;
    "soapenv:Body": {
      notifications: {
        "@_xmlns": string;
        OrganizationId: string;
        ActionId: string;
        SessionId: {
          "@_xsi:nil": string;
        };
        EnterpriseUrl: string;
        PartnerUrl: string;
        Notification: Record<string, unknown> | Record<string, unknown>[];
      };
    };
  };
}
