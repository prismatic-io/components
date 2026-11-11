//#region src/interfaces/user.d.ts
interface User {
  id: string;
  status: string;
  created: string;
  activated: boolean | string | null;
  statusChanged: boolean | string | null;
  lastLogin: string;
  lastUpdated: string;
  passwordChanged: string;
  type: Type;
  profile: Profile$2;
  realmId: string;
  credentials: Credentials$1;
  _links: Links$4;
}
interface Links$4 {
  self: Self$1;
}
type Self$1 = Record<string, unknown>;
interface Credentials$1 {
  password: Self$1;
  provider: Self$1;
}
interface Profile$2 {
  firstName: string;
  lastName: string;
  mobilePhone: string | string | null;
  secondEmail: string | string | null;
  login: string;
  email: string;
}
interface Type {
  id: string;
}
interface UserType {
  id: string;
  displayName: string;
  name: string;
  description: string;
  createdBy: string;
  lastUpdatedBy: string;
  created: string;
  lastUpdated: string;
  default: boolean;
}
//#endregion
//#region src/interfaces/policies.d.ts
interface Policy {
  type: string;
  id: string;
  status: string;
  name: string;
  description: string;
  priority: number;
  system: boolean;
  conditions: string | null;
  created: string;
  lastUpdated: string;
  _links: Links$3;
}
interface Links$3 {
  self: Rules;
  rules: Rules;
}
interface Rules {
  href: string;
  hints: Hints$1;
}
interface Hints$1 {
  allow: string[];
}
//#endregion
//#region src/interfaces/general.d.ts
interface Realm {
  id: string;
  created: string;
  lastUpdated: string;
  isDefault: boolean;
  profile: Profile$1;
  _links: Links$2;
}
interface Links$2 {
  self: Record<string, string>;
}
interface Profile$1 {
  name: string;
  realmType: string;
  domains: string[];
}
//#endregion
//#region node_modules/axios/index.d.ts
type UppercaseMethod = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK' | 'QUERY';
type Method = (UppercaseMethod | Lowercase<UppercaseMethod>) & {};
type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream' | 'formdata';
//#endregion
//#region src/interfaces/group.d.ts
interface Group {
  id: string;
  created: string;
  lastUpdated: string;
  lastMembershipUpdated: string;
  objectClass: string[];
  type: string;
  profile: Profile;
  _links: Links$1;
}
interface Links$1 {
  logo: Logo[];
  users: Apps;
  apps: Apps;
}
interface Apps {
  href: string;
}
interface Logo {
  name: string;
  href: string;
  type: string;
}
interface Profile {
  name: string;
  description: string;
}
//#endregion
//#region src/interfaces/webhook.d.ts
interface Webhook {
  id: string;
  status: string;
  verificationStatus: string;
  name: string;
  description: null | string;
  created: string;
  createdBy: string;
  lastUpdated: string;
  events: Events;
  channel: Channel;
  _links: Links;
}
interface Links {
  self: Self;
  verify: Deactivate$1;
  deactivate: Deactivate$1;
}
interface Deactivate$1 {
  href: string;
  hints: Hints;
}
interface Hints {
  allow: string[];
}
interface Self {
  href: string;
}
interface Channel {
  type: string;
  version: string;
  config: Config;
}
interface Config {
  uri: string;
  headers: string[];
  method: string;
  authScheme: AuthScheme;
}
interface AuthScheme {
  type: string;
  key: string;
}
interface Events {
  type: string;
  items: string[];
  filter: Filter | null;
}
interface Filter {
  type: string;
  eventFilterMap: EventFilterMap[];
}
interface EventFilterMap {
  event: string;
  condition: Condition;
}
interface Condition {
  version: string | null;
  expression: string;
}
interface EventHookDeletion {
  id: string;
  deleted: boolean;
}
//#endregion
//#region src/interfaces/application.d.ts
interface Application {
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
interface Accessibility {
  selfService: boolean;
  errorRedirectUrl: string | null;
  loginRedirectUrl: string | null;
}
interface Credentials {
  userNameTemplate: UserNameTemplate;
  signing: Signing;
}
type Signing = Record<string, unknown>;
interface UserNameTemplate {
  template: string;
  type: string;
}
interface Settings {
  app: Signing;
  notifications: Notifications;
  signOn: SignOn;
}
interface Notifications {
  vpn: VPN;
}
interface VPN {
  network: Network;
  message: string | null;
  helpUrl: string | null;
}
interface Network {
  connection: string;
}
interface SignOn {
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
interface AssertionEncryption {
  enabled: boolean;
  requestCompressed: boolean;
  allowMultipleAcsEndpoints: boolean;
  acsEndpoints: Record<string, unknown>[];
  attributeStatements: Record<string, unknown>[];
  _links: AssertionEncryptionLinks;
  _embedded: AssertionEncryptionEmbedded;
}
interface AssertionEncryptionEmbedded {
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
interface EmbeddedEmbedded {
  user: PurpleUser;
}
interface PurpleUser {
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
interface UserLinks {
  app: Deactivate;
  user: Deactivate;
}
interface Deactivate {
  href: string;
}
interface PurpleCredentials {
  userName: string;
  password: Signing;
}
interface EmbeddedLinks {
  logo: AppLink[];
  users: Deactivate;
  groups: Deactivate;
  self: Deactivate;
  deactivate: Deactivate;
}
interface AppLink {
  href: string;
  name: string;
  type: string;
}
interface EmbeddedAccessibility {
  selfService: boolean;
  errorRedirectUrl: string | null;
}
interface EmbeddedCredentials {
  scheme: string;
  userNameTemplate: UserNameTemplate;
}
interface EmbeddedSettings {
  app: App;
}
interface App {
  buttonField: string;
  passwordField: string;
  usernameField: string;
  url: string;
}
interface FluffyUser {
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
interface FluffyCredentials {
  userName: string;
}
interface EmbeddedVisibility {
  autoSubmitToolbar: boolean;
  hide: Hide;
  appLinks: PurpleAppLinks;
}
interface PurpleAppLinks {
  login: boolean;
}
interface Hide {
  iOS: boolean;
  web: boolean;
}
interface AssertionEncryptionLinks {
  logo: AppLink[];
  appLinks: AppLink[];
  help: Help;
  users: Deactivate;
  deactivate: Deactivate;
  groups: Deactivate;
  metadata: Help;
}
interface Help {
  href: string;
  type: string;
}
interface ParticipateSlo {
  enabled: boolean;
  logoutRequestUrl: string;
  sessionIndexRequired: boolean;
  bindingType: string;
}
interface Slo {
  enabled: boolean;
  spIssuer: string;
  logoutUrl: string;
}
interface SPCertificate {
  x5c: string[];
}
interface Visibility {
  autoSubmitToolbar: boolean;
  hide: Hide;
  appLinks: FluffyAppLinks;
}
interface FluffyAppLinks {
  testorgone_customsaml20app_1_link: boolean;
}
//#endregion
//#region src/interfaces/polling.d.ts
interface SystemLogEvent {
  uuid: string;
  published: string;
  eventType: string;
  severity?: string;
  displayMessage?: string;
  [key: string]: unknown;
}
interface SystemLogsCursor extends Record<string, unknown> {
  next: string;
  filter?: string;
}
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "okta-management-api";
  public: true;
  documentationUrl: "https://prismatic.io/docs/components/okta-management-api/";
  display: {
    label: string;
    description: string;
    category: "Application Connectors";
    iconPath: string;
  };
  connections: (import("@prismatic-io/spectral").KeyedConnection<{
    key: "oktaOAuth2AuthorizationCode";
    display: {
      label: string;
      description: string;
    };
    oauth2Type: import("@prismatic-io/spectral").OAuth2Type.AuthorizationCode;
    inputs: {
      oktaDomainUrl: {
        label: string;
        placeholder: string;
        example: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
      };
      scopes: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        shown: true;
        comments: string;
      };
      clientId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        example: string;
      };
      clientSecret: {
        label: string;
        placeholder: string;
        type: "password";
        required: true;
        shown: true;
        comments: string;
        example: string;
      };
    } & Partial<import("@prismatic-io/spectral").OAuth2AuthorizationCodeInputs> & {
      [key: string]: import("@prismatic-io/spectral").ConnectionInput;
    } & {
      tokenUrl: import("@prismatic-io/spectral").ConnectionTemplateInputField;
      authorizeUrl: import("@prismatic-io/spectral").ConnectionTemplateInputField;
    } & {
      [key: string]: import("@prismatic-io/spectral").ConnectionTemplateInputField;
    };
  }, "oktaOAuth2AuthorizationCode"> | import("@prismatic-io/spectral").KeyedConnection<{
    key: "oktaClientCredentialsOrg";
    display: {
      label: string;
      description: string;
    };
    inputs: {
      oktaDomainUrl: {
        label: string;
        placeholder: string;
        example: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
      };
      clientId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        example: string;
      };
      privateKey: {
        label: string;
        placeholder: string;
        type: "text";
        required: true;
        shown: true;
        comments: string;
      };
      scopes: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
      };
    };
  }, "oktaClientCredentialsOrg"> | import("@prismatic-io/spectral").KeyedConnection<{
    key: "oktaApiTokenConnection";
    display: {
      label: string;
      description: string;
    };
    inputs: {
      oktaDomainUrl: {
        label: string;
        placeholder: string;
        example: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
      };
      apiToken: {
        label: string;
        placeholder: string;
        type: "password";
        required: true;
        comments: string;
      };
    };
  }, "oktaApiTokenConnection">)[];
  actions: {
    activateUser: import("@prismatic-io/spectral").ActionDefinition<{
      id: {
        dataSource: string;
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      sendEmail: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    clearUserSessions: import("@prismatic-io/spectral").ActionDefinition<{
      userId: {
        comments: string;
        example: string;
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      oauthTokens: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      forgetDevices: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        id: string;
        status: string;
      };
    }>;
    createUser: import("@prismatic-io/spectral").ActionDefinition<{
      login: {
        label: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      email: {
        label: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      firstName: {
        required: boolean;
        label: string;
        type: "string";
        example: string;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      lastName: {
        required: boolean;
        label: string;
        type: "string";
        example: string;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      groupIds: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => object | undefined;
      };
      realmId: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown) => string | undefined;
      };
      provisioningOptions: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          activate: {
            label: string;
            type: "boolean";
            required: false;
            comments: string;
            clean: (value: unknown, defaultValue?: boolean) => boolean;
            default: string;
          };
          nextLogin: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          provider: {
            label: string;
            type: "boolean";
            required: false;
            comments: string;
            clean: (value: unknown, defaultValue?: boolean) => boolean;
          };
        };
      } & {
        type: "structuredObject";
      };
      additionalFields: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          department: {
            label: string;
            type: "string";
            required: false;
            example: string;
            comments: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          employeeNumber: {
            label: string;
            type: "string";
            required: false;
            example: string;
            comments: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          locale: {
            label: string;
            type: "string";
            required: false;
            example: string;
            default: string;
            comments: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          mobilePhone: {
            label: string;
            type: "string";
            required: false;
            example: string;
            comments: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          password: {
            label: string;
            type: "password";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          hashPassword: {
            label: string;
            type: "code";
            language: "json";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          question: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          answer: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          providerName: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          providerType: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            model: {
              label: string;
              value: string;
            }[];
            clean: (value: unknown) => string | undefined;
          };
          type: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            dataSource: string;
            clean: (value: unknown) => string | undefined;
          };
          profileExtraInputs: {
            label: string;
            comments: string;
            type: "code";
            language: "json";
            required: false;
            example: string;
            clean: (value: unknown) => object;
          };
        };
      } & {
        type: "structuredObject";
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: User;
    }>;
    deactivateUser: import("@prismatic-io/spectral").ActionDefinition<{
      id: {
        dataSource: string;
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      sendEmail: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        id: string;
        status: string;
      };
    }>;
    deleteUser: import("@prismatic-io/spectral").ActionDefinition<{
      id: {
        dataSource: string;
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      sendEmail: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        id: string;
        status: string;
      };
    }>;
    getUser: import("@prismatic-io/spectral").ActionDefinition<{
      id: {
        dataSource: string;
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      expand: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: User;
    }>;
    listUserApplications: import("@prismatic-io/spectral").ActionDefinition<{
      id: {
        dataSource: string;
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listUserFactors: import("@prismatic-io/spectral").ActionDefinition<{
      userId: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: ({
        id: string;
        factorType: string;
        provider: string;
        vendorName: string;
        status: string;
        created: string;
        lastUpdated: string;
        profile: {
          question: string;
          questionText: string;
          credentialId?: undefined;
        };
        _links: {
          questions: {
            href: string;
            hints: {
              allow: string[];
            };
          };
          self: {
            href: string;
            hints: {
              allow: string[];
            };
          };
          user: {
            href: string;
            hints: {
              allow: string[];
            };
          };
          next?: undefined;
        };
        _embedded?: undefined;
      } | {
        id: string;
        factorType: string;
        provider: string;
        status: string;
        created: string;
        lastUpdated: string;
        profile: {
          credentialId: string;
          question?: undefined;
          questionText?: undefined;
        };
        _links: {
          next: {
            name: string;
            href: string;
            hints: {
              allow: string[];
            };
          };
          self: {
            href: string;
            hints: {
              allow: string[];
            };
          };
          user: {
            href: string;
            hints: {
              allow: string[];
            };
          };
          questions?: undefined;
        };
        _embedded: {
          activation: {
            timeStep: number;
            sharedSecret: string;
            encoding: string;
            keyLength: number;
          };
        };
        vendorName?: undefined;
      })[];
    }>;
    listUserGroups: import("@prismatic-io/spectral").ActionDefinition<{
      id: {
        dataSource: string;
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listUsers: import("@prismatic-io/spectral").ActionDefinition<{
      fetchAll: {
        label: string;
        type: "boolean";
        comments: string;
        required: false;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      filters: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          search: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          filter: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          q: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          after: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          limit: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      sorting: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          sortBy: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          sortOrder: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            model: {
              label: string;
              value: string;
            }[];
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      extraParameters: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        comments: string;
        required: false;
        example: string;
        clean: (value: unknown) => Record<string, unknown>;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: User[];
    }>;
    listUserTypes: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: UserType[];
    }>;
    reactivateUser: import("@prismatic-io/spectral").ActionDefinition<{
      id: {
        dataSource: string;
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      sendEmail: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    resetUserPassword: import("@prismatic-io/spectral").ActionDefinition<{
      id: {
        dataSource: string;
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      sendEmail: {
        required: boolean;
        default: string;
        label: string;
        type: "boolean";
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      revokeSessions: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    setUserPassword: import("@prismatic-io/spectral").ActionDefinition<{
      userId: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      newPassword: {
        label: string;
        required: boolean;
        comments: string;
        placeholder: string;
        type: "password";
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      newHashPassword: {
        required: boolean;
        label: string;
        comments: string;
        placeholder: string;
        type: "code";
        language: "json";
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      oldPassword: {
        label: string;
        required: boolean;
        comments: string;
        placeholder: string;
        type: "password";
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      oldHashPassword: {
        required: boolean;
        label: string;
        comments: string;
        placeholder: string;
        type: "code";
        language: "json";
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      revokeSessions: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    suspendUser: import("@prismatic-io/spectral").ActionDefinition<{
      id: {
        dataSource: string;
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        id: string;
        status: string;
      };
    }>;
    unenrollUserFactor: import("@prismatic-io/spectral").ActionDefinition<{
      userId: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      factorId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      removeRecoveryEnrollment: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        id: string;
        status: string;
      };
    }>;
    unlockUser: import("@prismatic-io/spectral").ActionDefinition<{
      id: {
        dataSource: string;
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      sendEmail: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        id: string;
        status: string;
      };
    }>;
    unsuspendUser: import("@prismatic-io/spectral").ActionDefinition<{
      id: {
        dataSource: string;
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        id: string;
        status: string;
      };
    }>;
    updateUser: import("@prismatic-io/spectral").ActionDefinition<{
      id: {
        dataSource: string;
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      login: {
        required: boolean;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        example: string;
        comments: string;
        placeholder: string;
      };
      email: {
        required: boolean;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        example: string;
        comments: string;
        placeholder: string;
      };
      firstName: {
        label: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      lastName: {
        label: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      realmId: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown) => string | undefined;
      };
      additionalFields: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          department: {
            label: string;
            type: "string";
            required: false;
            example: string;
            comments: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          employeeNumber: {
            label: string;
            type: "string";
            required: false;
            example: string;
            comments: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          locale: {
            label: string;
            type: "string";
            required: false;
            example: string;
            default: string;
            comments: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          mobilePhone: {
            label: string;
            type: "string";
            required: false;
            example: string;
            comments: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          password: {
            label: string;
            type: "password";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          hashPassword: {
            label: string;
            type: "code";
            language: "json";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          question: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          answer: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          profileExtraInputs: {
            label: string;
            comments: string;
            type: "code";
            language: "json";
            required: false;
            example: string;
            clean: (value: unknown) => object;
          };
        };
      } & {
        type: "structuredObject";
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: User;
    }>;
    listPolicies: import("@prismatic-io/spectral").ActionDefinition<{
      type: {
        label: string;
        type: "string";
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
        required: true;
      };
      status: {
        label: string;
        type: "string";
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string | undefined;
        required: false;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        comments: string;
        required: false;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      q: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      expand: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      sortBy: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          after: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          limit: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      resourceId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Policy[];
    }>;
    getSystemLogs: import("@prismatic-io/spectral").ActionDefinition<{
      fetchAll: {
        label: string;
        type: "boolean";
        comments: string;
        required: false;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      filters: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          since: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          until: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          filter: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          q: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          after: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          limit: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      sortOrder: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown[];
    }>;
    listRealms: import("@prismatic-io/spectral").ActionDefinition<{
      fetchAll: {
        label: string;
        type: "boolean";
        comments: string;
        required: false;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          after: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          limit: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      search: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      sorting: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          sortBy: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          sortOrder: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            model: {
              label: string;
              value: string;
            }[];
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Realm[];
    }>;
    rawRequest: import("@prismatic-io/spectral").ActionDefinition<{
      url: {
        comments: string;
        example: string;
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        clean: (value: unknown) => string;
      };
      method: {
        label: string;
        type: "string";
        required: true;
        model: {
          label: Method;
          value: Method;
        }[];
        comments: string;
        clean: (value: unknown) => string;
      };
      data: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
      };
      formData: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        example: string;
      };
      fileData: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        example: string;
      };
      fileDataFileNames: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        clean: (values: any) => Record<string, string> | undefined;
      };
      queryParams: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
      };
      headers: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        example: string;
      };
      responseType: {
        label: string;
        placeholder: string;
        type: "string";
        default: string;
        required: true;
        comments: string;
        model: {
          label: ResponseType;
          value: ResponseType;
        }[];
        clean: (value: unknown) => ResponseType;
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => number;
      };
      retryDelayMS: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        default: string;
        clean: (value: unknown) => number;
      };
      retryAllErrors: {
        label: string;
        type: "boolean";
        default: string;
        required: false;
        comments: string;
        clean: (value: unknown) => boolean;
      };
      maxRetries: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        default: string;
        clean: (value: unknown) => number;
      };
      useExponentialBackoff: {
        label: string;
        type: "boolean";
        default: string;
        required: false;
        comments: string;
        clean: (value: unknown) => boolean;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    addUserToGroup: import("@prismatic-io/spectral").ActionDefinition<{
      groupId: {
        label: string;
        comments: string;
        example: string;
        placeholder: string;
        type: "string";
        required: true;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      userId: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        success: boolean;
        message: string;
      };
    }>;
    createGroup: import("@prismatic-io/spectral").ActionDefinition<{
      name: {
        label: string;
        comments: string;
        example: string;
        placeholder: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      description: {
        label: string;
        comments: string;
        example: string;
        placeholder: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Group;
    }>;
    deleteGroup: import("@prismatic-io/spectral").ActionDefinition<{
      groupId: {
        label: string;
        comments: string;
        example: string;
        placeholder: string;
        type: "string";
        required: true;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        id: string;
        status: string;
      };
    }>;
    getGroup: import("@prismatic-io/spectral").ActionDefinition<{
      groupId: {
        label: string;
        comments: string;
        example: string;
        placeholder: string;
        type: "string";
        required: true;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Group;
    }>;
    listGroups: import("@prismatic-io/spectral").ActionDefinition<{
      fetchAll: {
        label: string;
        type: "boolean";
        comments: string;
        required: false;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      filters: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          search: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          filter: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          q: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          after: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          limit: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      sorting: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          sortBy: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          sortOrder: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            model: {
              label: string;
              value: string;
            }[];
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      extraParameters: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        comments: string;
        required: false;
        example: string;
        clean: (value: unknown) => Record<string, unknown>;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Group[];
    }>;
    listGroupMembers: import("@prismatic-io/spectral").ActionDefinition<{
      groupId: {
        label: string;
        comments: string;
        example: string;
        placeholder: string;
        type: "string";
        required: true;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        comments: string;
        required: false;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          after: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          limit: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown[];
    }>;
    removeUserFromGroup: import("@prismatic-io/spectral").ActionDefinition<{
      groupId: {
        label: string;
        comments: string;
        example: string;
        placeholder: string;
        type: "string";
        required: true;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      userId: {
        comments: string;
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        success: boolean;
        message: string;
      };
    }>;
    updateGroup: import("@prismatic-io/spectral").ActionDefinition<{
      groupId: {
        label: string;
        comments: string;
        example: string;
        placeholder: string;
        type: "string";
        required: true;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      name: {
        required: boolean;
        clean: (value: unknown) => string | undefined;
        label: string;
        comments: string;
        example: string;
        placeholder: string;
        type: "string";
      };
      description: {
        label: string;
        comments: string;
        example: string;
        placeholder: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Group;
    }>;
    activateEventHook: import("@prismatic-io/spectral").ActionDefinition<{
      eventHookId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createEventHook: import("@prismatic-io/spectral").ActionDefinition<{
      eventHookName: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      eventHookUrl: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      doNotActivateOnCreate: {
        label: string;
        type: "boolean";
        comments: string;
        required: false;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      eventHookItems: {
        label: string;
        type: "string";
        collection: "valuelist";
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        required: false;
        clean: (arr: unknown) => string[];
      };
      eventHookItemsCode: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        required: false;
        clean: (value: unknown) => object | undefined;
      };
      eventHookUrlHeaders: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => any[] | undefined;
      };
      eventHookFilter: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        required: false;
        clean: (value: unknown) => object | undefined;
      };
      eventHookDescription: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Webhook;
    }>;
    deactivateEventHook: import("@prismatic-io/spectral").ActionDefinition<{
      eventHookId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteEventHook: import("@prismatic-io/spectral").ActionDefinition<{
      eventHookId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: EventHookDeletion;
    }>;
    deleteAllEventHooks: import("@prismatic-io/spectral").ActionDefinition<{
      eventHookUrl: {
        required: boolean;
        comments: string;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: EventHookDeletion[];
    }>;
    getEventHook: import("@prismatic-io/spectral").ActionDefinition<{
      eventHookId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Webhook;
    }>;
    listEventHooks: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Webhook[];
    }>;
    verifyEventHook: import("@prismatic-io/spectral").ActionDefinition<{
      eventHookId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Webhook;
    }>;
    assignApplicationToUser: import("@prismatic-io/spectral").ActionDefinition<{
      applicationId: {
        label: string;
        comments: string;
        example: string;
        placeholder: string;
        type: "string";
        required: true;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      userId: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      assignmentDetails: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          username: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          password: {
            comments: string;
            label: string;
            type: "password";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          profile: {
            label: string;
            type: "code";
            language: "json";
            required: false;
            comments: string;
            example: string;
            clean: (value: unknown) => object | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      scope: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getApplication: import("@prismatic-io/spectral").ActionDefinition<{
      applicationId: {
        label: string;
        comments: string;
        example: string;
        placeholder: string;
        type: "string";
        required: true;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      expand: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Application;
    }>;
    getApplicationUserAssignment: import("@prismatic-io/spectral").ActionDefinition<{
      applicationId: {
        label: string;
        comments: string;
        example: string;
        placeholder: string;
        type: "string";
        required: true;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      userId: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      expand: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listApplications: import("@prismatic-io/spectral").ActionDefinition<{
      fetchAll: {
        label: string;
        type: "boolean";
        comments: string;
        required: false;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      q: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          after: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          limit: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      resultOptions: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          useOptimization: {
            label: string;
            comments: string;
            type: "boolean";
            required: false;
            default: string;
            clean: (value: unknown, defaultValue?: boolean) => boolean;
          };
          expand: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          includeNonDeleted: {
            label: string;
            comments: string;
            type: "boolean";
            required: false;
            default: string;
            clean: (value: unknown, defaultValue?: boolean) => boolean;
          };
        };
      } & {
        type: "structuredObject";
      };
      filter: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Application[];
    }>;
    removeApplicationUserAssignment: import("@prismatic-io/spectral").ActionDefinition<{
      applicationId: {
        label: string;
        comments: string;
        example: string;
        placeholder: string;
        type: "string";
        required: true;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      userId: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      sendEmail: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        id: string;
        status: string;
      };
    }>;
    updateApplicationUserAssignment: import("@prismatic-io/spectral").ActionDefinition<{
      applicationId: {
        label: string;
        comments: string;
        example: string;
        placeholder: string;
        type: "string";
        required: true;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      userId: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      profile: {
        comments: string;
        label: string;
        type: "code";
        language: "json";
        required: false;
        example: string;
        clean: (value: unknown) => object | undefined;
      };
      username: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      password: {
        comments: string;
        label: string;
        type: "password";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
  };
  dataSources: {
    selectApplication: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectEventHook: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectGroup: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectRealm: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectUser: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectUserFactor: import("@prismatic-io/spectral").DataSourceDefinition<{
      userId: {
        dataSource: undefined;
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectUserType: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
  };
  triggers: {
    eventHook: import("@prismatic-io/spectral").TriggerDefinition<{
      eventHookItems: {
        label: string;
        type: "string";
        collection: "valuelist";
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        required: false;
        clean: (arr: unknown) => string[];
      };
      eventHookItemsCode: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        required: false;
        clean: (value: unknown) => object | undefined;
      };
      eventHookUrlHeaders: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => any[] | undefined;
      };
      eventHookFilter: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        required: false;
        clean: (value: unknown) => object | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, true, {
      payload: import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>;
      response: import("@prismatic-io/spectral").HttpResponse;
      branch: string;
    }, import("@prismatic-io/spectral").Inputs>;
    newUsersPollingTrigger: import("@prismatic-io/spectral").PollingTriggerDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      lookBackDate: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>, boolean, {
      payload: {
        body: {
          data: User[];
        };
        headers: {
          [key: string]: string;
        };
        queryParameters: {
          [key: string]: string;
        };
        rawBody: {
          data: unknown;
          contentType?: string;
        };
        pathFragment: string;
        webhookUrls: {
          [key: string]: string;
        };
        webhookApiKeys: {
          [key: string]: string[];
        };
        invokeUrl: string;
        executionId: string;
        customer: import("@prismatic-io/spectral").CustomerAttributes;
        instance: import("@prismatic-io/spectral").InstanceAttributes;
        user: import("@prismatic-io/spectral").UserAttributes;
        integration: import("@prismatic-io/spectral").IntegrationAttributes;
        flow: import("@prismatic-io/spectral").FlowAttributes;
        startedAt: string;
        globalDebug: boolean;
        paginationState?: Record<string, unknown> | undefined;
      };
      polledNoChanges: boolean;
    }, import("@prismatic-io/spectral").Inputs>;
    updatedUsersPollingTrigger: import("@prismatic-io/spectral").PollingTriggerDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      lookBackDate: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>, boolean, {
      payload: {
        body: {
          data: User[];
        };
        headers: {
          [key: string]: string;
        };
        queryParameters: {
          [key: string]: string;
        };
        rawBody: {
          data: unknown;
          contentType?: string;
        };
        pathFragment: string;
        webhookUrls: {
          [key: string]: string;
        };
        webhookApiKeys: {
          [key: string]: string[];
        };
        invokeUrl: string;
        executionId: string;
        customer: import("@prismatic-io/spectral").CustomerAttributes;
        instance: import("@prismatic-io/spectral").InstanceAttributes;
        user: import("@prismatic-io/spectral").UserAttributes;
        integration: import("@prismatic-io/spectral").IntegrationAttributes;
        flow: import("@prismatic-io/spectral").FlowAttributes;
        startedAt: string;
        globalDebug: boolean;
        paginationState?: Record<string, unknown> | undefined;
      };
      polledNoChanges: boolean;
    }, import("@prismatic-io/spectral").Inputs>;
    newSystemLogsPollingTrigger: import("@prismatic-io/spectral").PollingTriggerDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      lookBackDate: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string;
      };
      filter: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>, boolean, {
      payload: {
        paginationState: SystemLogsCursor | undefined;
        body: {
          data: SystemLogEvent[];
        };
        headers: {
          [key: string]: string;
        };
        queryParameters: {
          [key: string]: string;
        };
        rawBody: {
          data: unknown;
          contentType?: string;
        };
        pathFragment: string;
        webhookUrls: {
          [key: string]: string;
        };
        webhookApiKeys: {
          [key: string]: string[];
        };
        invokeUrl: string;
        executionId: string;
        customer: import("@prismatic-io/spectral").CustomerAttributes;
        instance: import("@prismatic-io/spectral").InstanceAttributes;
        user: import("@prismatic-io/spectral").UserAttributes;
        integration: import("@prismatic-io/spectral").IntegrationAttributes;
        flow: import("@prismatic-io/spectral").FlowAttributes;
        startedAt: string;
        globalDebug: boolean;
      };
      polledNoChanges: boolean;
    }, import("@prismatic-io/spectral").Inputs>;
  };
  hooks: {
    error: (error: unknown) => unknown;
  };
}>;
export = _default;