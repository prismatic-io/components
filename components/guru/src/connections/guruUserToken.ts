import { connection } from "@prismatic-io/spectral";

export const guruUserToken = connection({
  key: "guruUserToken",
  display: {
    label: "User Token",
    description:
      "Authenticate with Guru using a user token for read/write access",
  },
  comments:
    "A user token provides read/write access to Guru. Authenticate using username and user token.",
  inputs: {
    username: {
      label: "Username",
      placeholder: "your-username",
      type: "string",
      required: true,
      shown: true,
      comments: "Your Guru username or email address.",
    },
    userToken: {
      label: "User Token",
      placeholder: "User Token",
      type: "password",
      required: true,
      shown: true,
      comments:
        "Your user token for read/write access. Obtain this from your Guru account settings.",
    },
  },
});
