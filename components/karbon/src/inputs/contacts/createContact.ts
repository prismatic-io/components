import { input } from "@prismatic-io/spectral";
import { additionalFields, connection } from "../shared";
import { firstName, lastName } from "./shared";
const DOCUMENTATION_COMMENTS = `See [Karbon API documentation](https://karbonhq.github.io/karbon-api-reference/#post-/v3/Contacts) for more information.`;
export default {
  connection,
  firstName,
  lastName,
  additionalFields: input({
    ...additionalFields,
    example: JSON.stringify(
      {
        Salutation: "Mr",
        Suffix: "Jr.",
        RestrictionLevel: "Public",
        UserDefinedIdentifier: "BILLJR-001",
        BusinessCards: [
          {
            IsPrimaryCard: true,
            OrganizationKey: "7NN1ySxv89B",
            WebSites: ["www.website.one", "www.website.two"],
            EmailAddresses: ["sample@example.com", "sample.two@example.com"],
            RoleOrTitle: "COO",
            FacebookLink: "facebook.com/sampleName",
            LinkedInLink: "linkedin.com/sampleName",
            TwitterLink: "twitter.com/sampleName",
            SkypeLink: "skype.com/sampleName",
            Addresses: [
              {
                AddressLines: "45 Sample Street",
                City: "Alexandria",
                StateProvinceCounty: "NSW",
                ZipCode: 2015,
                CountryCode: "AU",
                Label: "Physical",
              },
            ],
            PhoneNumbers: [
              {
                Number: 1234567890,
                CountryCode: 61,
                Label: "Work",
              },
            ],
          },
        ],
      },
      null,
      2,
    ),
    comments: `${additionalFields.comments} ${DOCUMENTATION_COMMENTS}`,
  }),
};
