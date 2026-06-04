import { input } from "@prismatic-io/spectral";
import { connection } from "../shared";
import { cleanStringInput } from "../../utils";

const userId = input({
  label: "User ID",
  type: "string",
  comments: "The unique ID of the User to get.",
  required: true,
  clean: cleanStringInput,
  example: "2bYxtn94ZSdY",
  placeholder: "2bYxtn94ZSdY",
  dataSource: "selectUser",
});

export default { connection, userId };
