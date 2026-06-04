



export const getAccountExamplePayload = {
  data: {
    userid: "string",
    email: "string",
    name: "string",
    company_name: "string",
    company_id: "string",
    permissions: "string",
    profilepicture_url: "string",
    license: {
      license_type: 0,
      version: 0,
      type: "string",
      details: "string",
      teamViewerLicenseId: "00000000-0000-0000-0000-000000000000",
      isactive: true,
    },
    email_validated: true,
    email_language: "string",
    available_licenses: [
      {
        license_type: 0,
        type: "string",
        details: "string",
        teamViewerLicenseId: "00000000-0000-0000-0000-000000000000",
        isactive: true,
      },
    ],
    custom_field_has_paid_license: "string",
    social_login_identity_issuer: "string",
  },
};

export const createAccountExamplePayload = getAccountExamplePayload;

export const getAccountTenantIdsExamplePayload = {
  data: ["00000000-0000-0000-0000-000000000000"],
};
