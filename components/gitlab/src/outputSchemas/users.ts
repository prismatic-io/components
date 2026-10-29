import {
  bool,
  list,
  nullableNum,
  nullableStr,
  num,
  obj,
  str,
  userSchema,
} from "./shared";

export { userSchema };
export const userListSchema = list(userSchema);

export const currentUserSchema = obj({
  ...userSchema.properties,
  email: str,
  created_at: str,
  bio: nullableStr,
  location: nullableStr,
  linkedin: nullableStr,
  twitter: nullableStr,
  discord: nullableStr,
  github: nullableStr,
  website_url: nullableStr,
  organization: nullableStr,
  job_title: nullableStr,
  pronouns: nullableStr,
  bot: bool,
  work_information: nullableStr,
  followers: num,
  following: num,
  local_time: nullableStr,
  last_sign_in_at: nullableStr,
  confirmed_at: nullableStr,
  theme_id: nullableNum,
  last_activity_on: nullableStr,
  color_scheme_id: nullableNum,
  projects_limit: num,
  current_sign_in_at: nullableStr,
  identities: list(obj({ provider: str, extern_uid: str })),
  can_create_group: bool,
  can_create_project: bool,
  two_factor_enabled: bool,
  external: bool,
  private_profile: bool,
  commit_email: nullableStr,
  preferred_language: nullableStr,
});

export const getCurrentUserOutputSchema = currentUserSchema;

export const listUsersOutputSchema = userListSchema;
