export const personRepresentationSchema = {
  type: "object" as const,
  properties: {
    photos: {
      type: "string",
      format: "url",
    },
    homeEmails: {
      type: "string",
      format: "url",
    },
    personalInformation: {
      type: "string",
      format: "url",
    },
    homeWebAddresses: {
      type: "string",
      format: "url",
    },
    universal_ID: {
      type: "object" as const,
      properties: {
        id: {
          type: "string",
        },
      },
    },
    workInstantMessengers: {
      type: "string",
      format: "url",
    },
    homePhones: {
      type: "string",
      format: "url",
    },
    preferredName: {
      type: "string",
      format: "url",
    },
    workEmails: {
      type: "string",
      format: "url",
    },
    workAddresses: {
      type: "string",
      format: "url",
    },
    workWebAddresses: {
      type: "string",
      format: "url",
    },
    homeAddresses: {
      type: "string",
      format: "url",
    },
    legalName: {
      type: "string",
      format: "url",
    },
    audioNamePronunciation: {
      type: "string",
      format: "url",
    },
    socialNetworks: {
      type: "string",
      format: "url",
    },
    workPhones: {
      type: "string",
      format: "url",
    },
    additionalNames: {
      type: "string",
      format: "url",
    },
    homeInstantMessengers: {
      type: "string",
      format: "url",
    },
    href: {
      type: "string",
    },
    id: {
      type: "string",
    },
  },
};

export const getPersonByIdOutputSchema = personRepresentationSchema;

export const listPeopleOutputSchema = {
  type: ["object", "array"],
  properties: {
    total: {
      type: "integer",
      format: "int64",
    },
    data: {
      type: "array",
      items: personRepresentationSchema,
    },
  },
  items: personRepresentationSchema,
  required: [],
  additionalProperties: true,
};
