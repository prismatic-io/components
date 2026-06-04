import { input } from "@prismatic-io/spectral";
import { connection } from "../shared";
import { cleanStringInput } from "../../utils";

const userName = input({
  label: "User's Name",
  type: "string",
  comments: "The name of the User.",
  required: true,
  clean: cleanStringInput,
  example: "John Doe",
  placeholder: "John Doe",
});

const userEmail = input({
  label: "User's Email",
  type: "string",
  comments: "The email of the User.",
  required: true,
  clean: cleanStringInput,
  example: "example@email.com",
  placeholder: "example@email.com",
});

export default {
  connection,
  userName,
  userEmail,
};
