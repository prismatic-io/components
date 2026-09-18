import type { users } from "dropbox";
export const getCurrentAccountExamplePayload: users.FullAccount = {
  account_id: "dbid:AABv9tGtGYhIC5xkYMSNJfSTGDCyPzYqQGE",
  name: {
    given_name: "John",
    surname: "Doe",
    familiar_name: "John",
    display_name: "John Doe",
    abbreviated_name: "JD",
  },
  email: "john.doe@example.com",
  email_verified: true,
  profile_photo_url: "",
  disabled: false,
  country: "US",
  locale: "en",
  referral_link: "",
  is_paired: true,
  account_type: { ".tag": "basic" },
  root_info: {
    ".tag": "user",
    root_namespace_id: "123456789",
    home_namespace_id: "123456789",
  },
};
