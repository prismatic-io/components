import { input, util } from "@prismatic-io/spectral";
import { cleanCodeInput, cleanNumberInput, cleanStringInput } from "../../util";




const salutationId = input({
  label: "Salutation ID",
  comments: "Salutation record Id.",
  type: "string",
  required: false,
  placeholder: "0",
  example: "0",
  clean: cleanNumberInput,
});

const firstName = input({
  label: "First Name",
  comments: "Contact first name.",
  type: "string",
  required: false,
  placeholder: "John",
  example: "John",
  clean: cleanStringInput,
});

const middleName = input({
  label: "Middle Name",
  comments: "Contact middle name.",
  type: "string",
  required: false,
  placeholder: "Doe",
  example: "Doe",
  clean: cleanStringInput,
});

const lastName = input({
  label: "Last Name",
  comments: "Contact surname.",
  type: "string",
  required: false,
  placeholder: "Smith",
  example: "Smith",
  clean: cleanStringInput,
});

const isToDelete = input({
  label: "Is To Delete",
  comments:
    "When updating an existing customer, whether to delete this contact from the collection of customer contacts.",
  type: "boolean",
  required: false,
  default: "false",
  clean: util.types.toBool,
});

const emails = input({
  label: "Emails",
  comments:
    "An array of customer emails. See [Sage 200 API documentation](https://developer.sage.com/200/reference/customer_emails) for more information.",
  type: "code",
  language: "json",
  required: false,
  clean: cleanCodeInput,
});

const telephones = input({
  label: "Telephones",
  comments:
    "An array of customer telephones. See [Sage 200 API documentation](https://developer.sage.com/200/reference/customer_telephones) for more information.",
  type: "code",
  language: "json",
  required: false,
  clean: cleanCodeInput,
});

const mobiles = input({
  label: "Mobiles",
  comments:
    "An array of customer mobiles. See [Sage 200 API documentation](https://developer.sage.com/200/reference/customer_mobiles) for more information.",
  type: "code",
  language: "json",
  required: false,
  clean: cleanCodeInput,
});

const faxes = input({
  label: "Faxes",
  comments:
    "An array of customer faxes. See [Sage 200 API documentation](https://developer.sage.com/200/reference/customer_faxes) for more information.",
  type: "code",
  language: "json",
  required: false,
  clean: cleanCodeInput,
});

const websites = input({
  label: "Websites",
  comments:
    "An array of customer websites. See [Sage 200 API documentation](https://developer.sage.com/200/reference/customer_websites) for more information.",
  type: "code",
  language: "json",
  required: false,
  clean: cleanCodeInput,
});

const roles = input({
  label: "Roles",
  comments:
    "An array of customer contact roles. See [Sage 200 API documentation](https://developer.sage.com/200/reference/customer_contact_roles) for more information.",
  type: "code",
  language: "json",
  required: false,
  clean: cleanCodeInput,
});

export default {
  salutationId,
  firstName,
  middleName,
  lastName,
  isToDelete,
  emails,
  telephones,
  mobiles,
  faxes,
  websites,
  roles,
};
