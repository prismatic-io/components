import { apiTokenConnection } from "./apiTokenConnection";
import { oauth2TemplateConnection } from "./oauth2TemplateConnection";
import { zendeskConnection } from "./zendeskConnection";
export { apiTokenConnection } from "./apiTokenConnection";
export { oauth2TemplateConnection } from "./oauth2TemplateConnection";
export { zendeskConnection } from "./zendeskConnection";
export default [
  oauth2TemplateConnection,
  apiTokenConnection,
  zendeskConnection,
];
