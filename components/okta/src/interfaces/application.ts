export interface Application {
  id: string;
  orn: string;
  name: string;
  label: string;
  status: string;
  lastUpdated: string;
  created: string;
  accessibility: Accessibility;
  visibility: Visibility;
  features: Record<string, unknown>[];
  signOnMode: string;
  credentials: Credentials;
  settings: Settings;
}

export interface Accessibility {
  selfService: boolean;
  errorRedirectUrl: string | null;
  loginRedirectUrl: string | null;
}

export interface Credentials {
  userNameTemplate: UserNameTemplate;
  signing: Signing;
}

export type Signing = Record<string, unknown>;

export interface UserNameTemplate {
  template: string;
  type: string;
}

export interface Settings {
  app: Signing;
  notifications: Notifications;
  signOn: SignOn;
}

export interface Notifications {
  vpn: VPN;
}

export interface VPN {
  network: Network;
  message: string | null;
  helpUrl: string | null;
}

export interface Network {
  connection: string;
}

export interface SignOn {
  defaultRelayState: string;
  ssoAcsUrl: string;
  idpIssuer: string;
  audience: string;
  recipient: string;
  destination: string;
  subjectNameIdTemplate: string;
  subjectNameIdFormat: string;
  responseSigned: boolean;
  assertionSigned: boolean;
  signatureAlgorithm: string;
  digestAlgorithm: string;
  honorForceAuthn: boolean;
  authnContextClassRef: string;
  slo: Slo;
  participateSlo: ParticipateSlo;
  spCertificate: SPCertificate;
  assertionEncryption: AssertionEncryption;
}

export interface AssertionEncryption {
  enabled: boolean;
  requestCompressed: boolean;
  allowMultipleAcsEndpoints: boolean;
  acsEndpoints: Record<string, unknown>[];
  attributeStatements: Record<string, unknown>[];
  _links: AssertionEncryptionLinks;
  _embedded: AssertionEncryptionEmbedded;
}

export interface AssertionEncryptionEmbedded {
  user: FluffyUser;
  id: string;
  name: string;
  label: string;
  status: string;
  lastUpdated: string;
  created: string;
  accessibility: EmbeddedAccessibility;
  visibility: EmbeddedVisibility;
  features: Record<string, unknown>[];
  signOnMode: string;
  credentials: EmbeddedCredentials;
  settings: EmbeddedSettings;
  _links: EmbeddedLinks;
  _embedded: EmbeddedEmbedded;
}

export interface EmbeddedEmbedded {
  user: PurpleUser;
}

export interface PurpleUser {
  id: string;
  externalId: string | null;
  created: string;
  lastUpdated: string;
  scope: string;
  status: string;
  statusChanged: string;
  passwordChanged: string;
  syncState: string;
  lastSync: string | null;
  credentials: PurpleCredentials;
  _links: UserLinks;
}

export interface UserLinks {
  app: Deactivate;
  user: Deactivate;
}

export interface Deactivate {
  href: string;
}

export interface PurpleCredentials {
  userName: string;
  password: Signing;
}

export interface EmbeddedLinks {
  logo: AppLink[];
  users: Deactivate;
  groups: Deactivate;
  self: Deactivate;
  deactivate: Deactivate;
}

export interface AppLink {
  href: string;
  name: string;
  type: string;
}

export interface EmbeddedAccessibility {
  selfService: boolean;
  errorRedirectUrl: string | null;
}

export interface EmbeddedCredentials {
  scheme: string;
  userNameTemplate: UserNameTemplate;
}

export interface EmbeddedSettings {
  app: App;
}

export interface App {
  buttonField: string;
  passwordField: string;
  usernameField: string;
  url: string;
}

export interface FluffyUser {
  id: string;
  externalId: string | null;
  created: string;
  lastUpdated: string;
  scope: string;
  status: string;
  statusChanged: string;
  passwordChanged: string | null;
  syncState: string;
  lastSync: string | null;
  credentials: FluffyCredentials;
  _links: UserLinks;
}

export interface FluffyCredentials {
  userName: string;
}

export interface EmbeddedVisibility {
  autoSubmitToolbar: boolean;
  hide: Hide;
  appLinks: PurpleAppLinks;
}

export interface PurpleAppLinks {
  login: boolean;
}

export interface Hide {
  iOS: boolean;
  web: boolean;
}

export interface AssertionEncryptionLinks {
  logo: AppLink[];
  appLinks: AppLink[];
  help: Help;
  users: Deactivate;
  deactivate: Deactivate;
  groups: Deactivate;
  metadata: Help;
}

export interface Help {
  href: string;
  type: string;
}

export interface ParticipateSlo {
  enabled: boolean;
  logoutRequestUrl: string;
  sessionIndexRequired: boolean;
  bindingType: string;
}

export interface Slo {
  enabled: boolean;
  spIssuer: string;
  logoutUrl: string;
}

export interface SPCertificate {
  x5c: string[];
}

export interface Visibility {
  autoSubmitToolbar: boolean;
  hide: Hide;
  appLinks: FluffyAppLinks;
}

export interface FluffyAppLinks {
  testorgone_customsaml20app_1_link: boolean;
}
