import { dataSource, util } from "@prismatic-io/spectral";
import { createSalesforceHttpClient } from "../../client";
import { previewRecordTypeFieldsInputs } from "../../inputs";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";

export const previewRecordTypeFields = dataSource({
  display: {
    label: "Preview Record Type Fields",
    description:
      "A list of fields of the specified Record Type for use as a preview during configuration.",
  },
  inputs: previewRecordTypeFieldsInputs,
  perform: async (_context, { version, connection, dynamicRecordType }) => {
    const httpClient = await createSalesforceHttpClient(version, connection);

    try {
      const {
        data: { fields },
      } = await httpClient.get(`/sobjects/${dynamicRecordType}/describe/`);

      const fieldList: string[] = fields.map(({ label }) => label);

      return {
        result: fieldList,
      };
    } catch (error) {
      throw new Error(util.types.toJSON(handleErrors(error)));
    }
  },
  dataSourceType: "picklist",
});
