export const TYPE_MODEL = [
  {
    label: "OKTA_SIGN_ON",
    value: "OKTA_SIGN_ON",
  },
  {
    label: "PASSWORD",
    value: "PASSWORD",
  },
  {
    label: "MFA_ENROLL",
    value: "MFA_ENROLL",
  },
  {
    label: "IDP_DISCOVERY",
    value: "IDP_DISCOVERY",
  },
  {
    label: "ACCESS_POLICY",
    value: "ACCESS_POLICY",
  },
  {
    label: "DEVICE_SIGNAL_COLLECTION",
    value: "DEVICE_SIGNAL_COLLECTION",
  },
  {
    label: "PROFILE_ENROLLMENT",
    value: "PROFILE_ENROLLMENT",
  },
  {
    label: "POST_AUTH_SESSION",
    value: "POST_AUTH_SESSION",
  },
  {
    label: "ENTITY_RISK",
    value: "ENTITY_RISK",
  },
];

export const EVENT_LIST_MODEL = [
  { label: "User Created", value: "user.lifecycle.create" },
  {
    label: "User Activated",
    value: "user.lifecycle.activate",
  },
  {
    label: "User Deactivated",
    value: "user.lifecycle.deactivate",
  },
  { label: "User Suspended", value: "user.lifecycle.suspend" },
  {
    label: "User Unsuspended",
    value: "user.lifecycle.unsuspend",
  },
  {
    label: "User SSO Authentication",
    value: "user.authentication.sso",
  },
  {
    label: "User Authentication Verified",
    value: "user.authentication.verify",
  },
  { label: "User Session Started", value: "user.session.start" },
  { label: "User Session Ended", value: "user.session.end" },
  {
    label: "User Accessed Admin App",
    value: "user.session.access_admin_app",
  },
  {
    label: "User Impersonation Started",
    value: "user.session.impersonation.initiate",
  },
  {
    label: "User Impersonation Ended",
    value: "user.session.impersonation.terminate",
  },
  {
    label: "User Added to Group",
    value: "group.user_membership.add",
  },
  {
    label: "User Removed from Group",
    value: "group.user_membership.remove",
  },
  {
    label: "User Added to Application",
    value: "application.user_membership.add",
  },
  {
    label: "User Removed from Application",
    value: "application.user_membership.remove",
  },
  {
    label: "User Application Password Changed",
    value: "application.user_membership.change_password",
  },
  {
    label: "User Application Membership Updated",
    value: "application.user_membership.update",
  },
];

export const EVENT_WEBHOOK_VERSION = "1.0.0";
export const EVENT_WEBHOOK_CHANNEL_TYPE = "HTTP";
export const EVENT_WEBHOOK_TYPE = "EVENT_TYPE";
