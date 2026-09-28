import { dataSource, type Element } from "@prismatic-io/spectral";
import { selectAccountInputs } from "../inputs";
import { selectAccountExamplePayload } from "../examplePayloads";
import { getApi } from "../api";
import { KlaviyoApi } from "../constants";
export const selectAccount = dataSource({
  display: {
    label: "Select Account",
    description: "Select an account to use.",
  },
  inputs: selectAccountInputs,
  dataSourceType: "picklist",
  perform: async (_context, { connection }) => {
    const accountsApi = getApi(connection, KlaviyoApi.Accounts);
    const { body } = await accountsApi.getAccounts({
      fieldsAccount: ["contact_information.default_sender_name"],
    });
    const objects = body.data.map<Element>((response) => ({
      key: response.id,
      label: response.attributes.contactInformation.defaultSenderName,
    }));
    return { result: objects };
  },
  examplePayload: selectAccountExamplePayload,
});
