import { action } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../../client";
import { updateCompanyInformationExamplePayload } from "../../examplePayloads";
import { companyId } from "../../inputs/accounts/getAccountsInputs";
import {
  address,
  companyCurrencyCode,
  companyCurrentFiscalYearStartDate,
  companyDisplayName,
  companyIndustry,
  companyInformationId,
  companyTaxRegistrationNumber,
  contactInfo,
} from "../../inputs/companies/updateCompanyInformationInputs";
import { connectionInput } from "../../inputs/general";
import type { CompanyInformation } from "../../interfaces";
export const updateCompanyInformation = action({
  display: {
    label: "Update Company Information",
    description:
      "Update the properties of a company information object in your Business Central organization.",
  },
  perform: async (
    context,
    {
      companyId,
      companyInformationId,
      companyIndustry,
      address,
      contactInfo,
      companyTaxRegistrationNumber,
      companyCurrencyCode,
      companyCurrentFiscalYearStartDate,
      companyDisplayName,
      connection,
    },
  ) => {
    const client = getMsBusinessCentralClient(
      connection,
      context,
      context.debug.enabled,
    );
    const payload = {
      phoneNumber: contactInfo.companyPhoneNumber,
      faxNumber: contactInfo.companyFaxNumber,
      industry: companyIndustry,
      city: address.companyCity,
      country: address.companyCountry,
      postalCode: address.companyPostalCode,
      state: address.companyState,
      taxRegistrationNumber: companyTaxRegistrationNumber,
      website: contactInfo.companyWebsite,
      email: contactInfo.companyEmail,
      currencyCode: companyCurrencyCode,
      currentFiscalYearStartDate: companyCurrentFiscalYearStartDate,
      displayName: companyDisplayName,
      addressLine1: address.companyAddressLine1,
      addressLine2: address.companyAddressLine2,
    };
    const headers = {
      "If-Match": "*",
    };
    const { data } = await client.patch<CompanyInformation>(
      `/companies(${companyId})/companyInformation(${companyInformationId})`,
      payload,
      {
        headers,
      },
    );
    return { data };
  },
  inputs: {
    connection: connectionInput,
    companyId,
    companyInformationId,
    companyDisplayName,
    address,
    contactInfo,
    companyTaxRegistrationNumber,
    companyCurrencyCode,
    companyCurrentFiscalYearStartDate,
    companyIndustry,
  },
  examplePayload: updateCompanyInformationExamplePayload,
});
