import { connection } from "@prismatic-io/spectral";
export const basic = connection({
  key: "basic",
  display: {
    label: "Basic Username/Password",
    description: "Basic Username and Password connection",
  },
  inputs: {
    username: {
      label: "Username",
      placeholder: "Username",
      type: "string",
      required: true,
      shown: true,
      comments: "Username",
    },
    password: {
      label: "Password",
      placeholder: "Password",
      type: "password",
      required: true,
      shown: true,
      comments: "Password",
    },
  },
});
