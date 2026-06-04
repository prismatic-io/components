import { input, util } from "@prismatic-io/spectral";
import { BOOLEAN_INPUT_MODEL } from "../../constants";
import { cleanBooleanInput, cleanStringInput } from "../../utils";
import { companyId } from "../accounts/getAccountsInputs";
import { connectionInput, odataParams } from "../general";


export const vendorId = input({
  label: "Vendor ID",
  type: "string",
  comments: "The unique identifier of the vendor.",
  required: true,
  example: "5d115c9c-44e3-ea11-bb43-000d3a2feca1",
  placeholder: "Enter vendor ID",
  dataSource: "selectVendor",
  clean: util.types.toString,
});

export const displayName = input({
  label: "Display Name",
  example: "First Up Consultants",
  comments: "Specifies the vendor's name.",
  placeholder: "Enter display name",
  required: true,
  type: "string",
  clean: util.types.toString,
});

export const addressLine1 = input({
  label: "Address Line 1",
  type: "string",
  comments: "Specifies the first line of the vendor's address.",
  example: "100 Day Drive",
  placeholder: "Enter address line 1",
  required: false,
  clean: cleanStringInput,
});

export const addressLine2 = input({
  label: "Address Line 2",
  type: "string",
  comments: "Specifies the second line of the vendor's address.",
  example: "Suite 200",
  placeholder: "Enter address line 2",
  required: false,
  clean: cleanStringInput,
});

export const city = input({
  label: "City",
  type: "string",
  comments: "Specifies the city of the vendor's address.",
  example: "Chicago",
  placeholder: "Enter city",
  required: false,
  clean: cleanStringInput,
});

export const state = input({
  label: "State",
  type: "string",
  comments: "Specifies the state of the vendor's address.",
  example: "IL",
  placeholder: "Enter state",
  required: false,
  clean: cleanStringInput,
});

export const country = input({
  label: "Country",
  type: "string",
  comments: "Specifies the country of the vendor's address.",
  example: "US",
  placeholder: "Enter country",
  required: false,
  clean: cleanStringInput,
});

export const postalCode = input({
  label: "Postal Code",
  type: "string",
  comments: "Specifies the postal code of the vendor's address.",
  example: "61236",
  placeholder: "Enter postal code",
  required: false,
  clean: cleanStringInput,
});

export const phoneNumber = input({
  label: "Phone Number",
  type: "string",
  comments: "Specifies the vendor's phone number.",
  example: "+1 555-555-5555",
  placeholder: "Enter phone number",
  required: false,
  clean: cleanStringInput,
});

export const email = input({
  label: "Email",
  type: "string",
  comments: "Specifies the vendor's email address.",
  example: "vendor@contoso.com",
  placeholder: "Enter email address",
  required: false,
  clean: cleanStringInput,
});

export const website = input({
  label: "Website",
  type: "string",
  comments: "Specifies the vendor's website.",
  example: "www.example.com",
  placeholder: "Enter website",
  required: false,
  clean: cleanStringInput,
});

export const taxRegistrationNumber = input({
  label: "Tax Registration Number",
  type: "string",
  comments: "Specifies the vendor's tax registration number.",
  placeholder: "Enter tax registration number",
  required: false,
  clean: cleanStringInput,
});

export const currencyId = input({
  label: "Currency ID",
  type: "string",
  comments: "Specifies the currency used by the vendor.",
  example: "5d115c9c-44e3-ea11-bb43-000d3a2feca1",
  placeholder: "Enter currency ID",
  required: false,
  clean: cleanStringInput,
});

export const currencyCode = input({
  label: "Currency Code",
  type: "string",
  comments: "Specifies the currency code used by the vendor.",
  example: "USD",
  placeholder: "Enter currency code",
  required: false,
  clean: cleanStringInput,
});

export const irs1099Code = input({
  label: "IRS 1099 Code",
  type: "string",
  comments: "Specifies the IRS 1099 code for the vendor.",
  placeholder: "Enter IRS 1099 code",
  required: false,
  clean: cleanStringInput,
});

export const paymentTermsId = input({
  label: "Payment Terms ID",
  type: "string",
  comments: "Specifies the payment terms used by the vendor.",
  example: "04a5738a-44e3-ea11-bb43-000d3a2feca1",
  placeholder: "Enter payment terms ID",
  required: false,
  clean: cleanStringInput,
});

export const paymentMethodId = input({
  label: "Payment Method ID",
  type: "string",
  comments: "Specifies the payment method used by the vendor.",
  example: "3b196a90-44e3-ea11-bb43-000d3a2feca1",
  placeholder: "Enter payment method ID",
  required: false,
  clean: cleanStringInput,
});

export const taxLiable = input({
  label: "Tax Liable",
  comments: "When true, the vendor is liable for sales tax.",
  type: "boolean",
  required: false,
  clean: util.types.toBool,
});

export const blocked = input({
  label: "Blocked",
  comments:
    "Specifies which transactions with the vendor cannot be posted. " +
    "It can be empty, 'Payment', or 'All'.",
  type: "string",
  example: "Payment",
  placeholder: "Select blocked status",
  model: ["Payment", "All"].map((value) => ({ value, label: value })),
  required: false,
  clean: cleanStringInput,
});


export const listVendorsInputs = {
  connection: connectionInput,
  companyId,
  ...odataParams,
};

export const getVendorInputs = {
  connection: connectionInput,
  companyId,
  vendorId,
};

export const createVendorInputs = {
  connection: connectionInput,
  companyId: {
    ...companyId,
    comments: "The ID of the company you want to create the vendor in.",
  },
  displayName,
  addressLine1,
  addressLine2,
  city,
  state,
  country,
  postalCode,
  phoneNumber,
  email,
  website,
  taxLiable,
  taxRegistrationNumber,
  currencyId,
  currencyCode,
  irs1099Code,
  paymentTermsId,
  paymentMethodId,
  blocked,
};

export const updateVendorInputs = {
  connection: connectionInput,
  companyId: {
    ...companyId,
    comments: "The ID of the company to which the vendor belongs.",
  },
  vendorId,
  displayName: { ...displayName, required: false, clean: cleanStringInput },
  addressLine1,
  addressLine2,
  city,
  state,
  country,
  postalCode,
  phoneNumber,
  email,
  website,
  taxLiable: {
    ...taxLiable,
    required: false,
    clean: cleanBooleanInput,
    type: "string" as const,
    model: BOOLEAN_INPUT_MODEL,
  },
  taxRegistrationNumber,
  currencyId,
  currencyCode,
  irs1099Code,
  paymentTermsId,
  paymentMethodId,
  blocked,
};

export const deleteVendorInputs = {
  connection: connectionInput,
  companyId,
  vendorId,
};
