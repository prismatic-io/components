import { action } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../../client";
import { updateCompanyInformationExamplePayload } from "../../examplePayloads";
import { companyId } from "../../inputs/accounts/getAccountsInputs";
import {
  companyAddressLine1,
  companyAddressLine2,
  companyCity,
  companyCountry,
  companyCurrencyCode,
  companyCurrentFiscalYearStartDate,
  companyDisplayName,
  companyEmail,
  companyFaxNumber,
  companyIndustry,
  companyInformationId,
  companyPhoneNumber,
  companyPostalCode,
  companyState,
  companyTaxRegistrationNumber,
  companyWebsite,
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
      companyPhoneNumber,
      companyFaxNumber,
      companyIndustry,

      companyCity,
      companyCountry,
      companyPostalCode,
      companyState,
      companyTaxRegistrationNumber,
      companyWebsite,
      companyEmail,
      companyCurrencyCode,
      companyCurrentFiscalYearStartDate,
      companyDisplayName,
      companyAddressLine1,
      companyAddressLine2,
      connection,
    },
  ) => {
    const client = getMsBusinessCentralClient(connection, context, context.debug.enabled);
    const payload = {
      phoneNumber: companyPhoneNumber,
      faxNumber: companyFaxNumber,
      industry: companyIndustry,
      city: companyCity,
      country: companyCountry,
      postalCode: companyPostalCode,
      state: companyState,
      taxRegistrationNumber: companyTaxRegistrationNumber,
      website: companyWebsite,
      email: companyEmail,
      currencyCode: companyCurrencyCode,
      currentFiscalYearStartDate: companyCurrentFiscalYearStartDate,
      displayName: companyDisplayName,
      addressLine1: companyAddressLine1,
      addressLine2: companyAddressLine2,
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
    companyAddressLine1,
    companyAddressLine2,
    companyCity,
    companyState,
    companyCountry,
    companyPostalCode,
    companyPhoneNumber,
    companyFaxNumber,
    companyEmail,
    companyWebsite,
    companyTaxRegistrationNumber,
    companyCurrencyCode,
    companyCurrentFiscalYearStartDate,
    companyIndustry,
  },
  examplePayload: updateCompanyInformationExamplePayload,
});
