import { input } from "@prismatic-io/spectral";
import { cleanStringInput } from "../../utils";

export const contactkey = input({
  label: "Contactkey",
  comments: "The Contact key.",
  type: "string",
  required: true,
  clean: cleanStringInput,
  example: "4jgPTtcXxwC2",
  placeholder: "4jgPTtcXxwC2",
  dataSource: "selectContact",
});

export const firstName = input({
  label: "Contact's First Name",
  comments: "The first name of the Contact.",
  type: "string",
  required: true,
  clean: cleanStringInput,
  example: "John",
  placeholder: "John",
});

export const lastName = input({
  label: "Contact's Last Name",
  comments: "The last name of the Contact.",
  type: "string",
  required: true,
  clean: cleanStringInput,
  example: "Doe",
  placeholder: "Doe",
});
