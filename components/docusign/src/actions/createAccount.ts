import { action } from "@prismatic-io/spectral";
import { getDocuSignClient } from "../client";
import {
  accountName,
  address1,
  address2,
  city,
  company,
  connection,
  country,
  distributorCode,
  distributorPassword,
  email,
  fax,
  firstName,
  includedSeats,
  jobTitle,
  lastName,
  middleName,
  phone,
  planId,
  postalCode,
  referralCode,
  referrerName,
  state,
  suffixName,
  userName,
} from "../inputs";
import { cleanObject } from "../utils";

export const createAccount = action({
  display: {
    label: "Create Account",
    description: "Creates a new DocuSign account.",
  },
  perform: async (
    context,
    {
      accountName,
      address1,
      address2,
      city,
      company,
      connection,
      country,
      distributorCode,
      distributorPassword,
      email,
      fax,
      firstName,
      includedSeats,
      jobTitle,
      lastName,
      middleName,
      phone,
      planId,
      postalCode,
      referralCode,
      referrerName,
      state,
      suffixName,
      userName,
    },
  ) => {
    const client = await getDocuSignClient(
      connection,
      false,
      context.debug.enabled,
    );

    const accountRequest = cleanObject({
      accountName,
      distributorCode,
      distributorPassword,
      initialUser: {
        email,
        firstName,
        middleName,
        lastName,
        suffixName,
        userName,
        jobTitle,
        company,
      },
      addressInformation: {
        address1,
        address2,
        city,
        state,
        postalCode,
        country,
        phone,
        fax,
      },
      planInformation: {
        planId,
      },
      referralInformation: {
        includedSeats,
        referralCode,
        referrerName,
      },
    });

    const body = {
      newAccountRequest: [accountRequest],
    };

    const { data } = await client.post(`/`, body);
    return { data };
  },
  inputs: {
    connection,
    accountName,
    userName,
    firstName,
    lastName,
    middleName,
    address1,
    address2,
    city,
    state,
    country,
    postalCode,
    phone,
    company,
    email,
    fax,
    includedSeats,
    jobTitle,
    planId,
    referralCode,
    referrerName,
    suffixName,
    distributorCode,
    distributorPassword,
  },
});
