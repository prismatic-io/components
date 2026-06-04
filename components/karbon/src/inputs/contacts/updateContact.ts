import { input } from "@prismatic-io/spectral";
import { cleanStringInput } from "../../utils";
import { connection } from "../shared";
import { contactkey, firstName, lastName } from "./shared";

const middleName = input({
  label: "Contact's Middle Name",
  comments: "The middle name of the Contact.",
  type: "string",
  required: false,
  clean: cleanStringInput,
  example: "John",
  placeholder: "John",
});

const preferredName = input({
  label: "Contact's Preferred Name",
  comments: "The preferred name of the Contact.",
  type: "string",
  required: false,
  clean: cleanStringInput,
  example: "John",
  placeholder: "John",
});

const salutation = input({
  label: "Contact's Salutation",
  comments: "The title to address the Contact.",
  type: "string",
  required: false,
  clean: cleanStringInput,
  example: "Mr",
  placeholder: "Mr",
});

const suffix = input({
  label: "Contact's Suffix",
  comments: "The suffix of the Contact.",
  type: "string",
  required: false,
  clean: cleanStringInput,
  example: "Jr.",
  placeholder: "Jr.",
});

export default {
  connection,
  contactkey: input({
    ...contactkey,
    comments: `${contactkey.comments} to update the Contact for.`,
  }),
  firstName: input({ ...firstName, required: false }),
  lastName: input({ ...lastName, required: false }),
  middleName,
  preferredName,
  salutation,
  suffix,
};
