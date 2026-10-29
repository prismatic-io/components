interface Code {
  codeValue: string;
}

interface EventStatusCode {
  codeValue: string;
  shortName: string;
}

interface Tor {
  associateOID: string;
}

interface ConsumerApplicationSubscriptionCredential {
  subscriberOrganizationOID: string;
  clientID: string;
  clientSecret: string;
}

interface Output {
  consumerApplicationSubscriptionCredentials: ConsumerApplicationSubscriptionCredential[];
}

interface Data {
  output: Output;
}

interface Event {
  eventStatusCode: EventStatusCode;
  data: Data;
  eventID: string;
  eventNameCode: Code;
  recordDateTime: string;
  creationDateTime: string;
  effectiveDateTime: string;
  serviceCategoryCode: Code;
  actor: Tor;
  originator: Tor;
}

export interface ConsumerApplicationSubscription {
  events: Event[];
}

export interface PersistedToken {
  accessToken: string;
  expiresDate: number;
}
