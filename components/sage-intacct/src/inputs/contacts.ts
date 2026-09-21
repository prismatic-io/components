import {
  activeInput,
  companyNameInput,
  connection,
  contactDetails,
  contactNameInput,
  fieldsInput,
  name,
  printAsInput,
  recordNoInput,
  taxInfo,
} from "./common";
export const createContactInputs = {
  connection,
  contactNameInput: {
    ...contactNameInput,
    comments: "Contact name to create",
  },
  printAsInput: { ...printAsInput, required: true },
  activeInput,
  companyNameInput,
  name,
  contactDetails,
  taxInfo,
};
export const getContactInputs = {
  connection,
  fieldsInput,
  recordNoInput: { ...recordNoInput, dataSource: "selectContact" },
};
export const updateContactInputs = {
  connection,
  contactNameInput: {
    ...contactNameInput,
    dataSource: "selectContact",
  },
  printAsInput,
  activeInput,
  companyNameInput,
  name,
  contactDetails,
  taxInfo,
};
