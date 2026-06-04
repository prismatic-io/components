import { dataSource, type Element } from "@prismatic-io/spectral";
import { connection } from "../inputs/shared";
import { getApi } from "../api";
import { KlaviyoApi } from "../enums/KlaviyoApi";

export const selectAccount = dataSource({
  display: {
    label: "Select Account",
    description: "Select an account to use.",
  },
  inputs: { connection },
  dataSourceType: "picklist",
  perform: async (context, { connection }) => {
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
});
