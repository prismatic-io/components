import { dataSource, type Element } from "@prismatic-io/spectral";
import { selectContactExamplePayload } from "../examplePayloads";
import { selectContactInputs } from "../inputs";
import { queryRecordsPaginated } from "../util";
export const selectContact = dataSource({
  dataSourceType: "picklist",
  display: {
    label: "Select Contact",
    description: "Lists contacts in Sage Intacct.",
  },
  perform: async (_context, { connection, returnContactNameInput }) => {
    const contacts = await queryRecordsPaginated(
      connection,
      "CONTACT",
      ["*"],
      "",
    );
    return {
      result: contacts.map(
        (contact: {
          RECORDNO: string;
          CONTACTNAME: string;
          FIRSTNAME: string;
          LASTNAME: string;
        }): Element => {
          const firstName = contact.FIRSTNAME;
          const lastName = contact.LASTNAME;
          let name = "";
          if (firstName) {
            name += firstName;
          }
          if (lastName) {
            name += ` ${lastName}`;
          }
          const label = contact.CONTACTNAME || name;
          return {
            label,
            key: returnContactNameInput
              ? contact.CONTACTNAME
              : contact.RECORDNO,
          };
        },
      ),
    };
  },
  inputs: selectContactInputs,
  examplePayload: selectContactExamplePayload,
});
