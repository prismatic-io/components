import { dataSource, type ObjectSelection, util } from "@prismatic-io/spectral";
import { createSalesforceHttpClient } from "../../client";
import { selectRecordTypesWithFieldsInputs } from "../../inputs";

export const selectRecordTypesWithFields = dataSource({
  display: {
    label: "Select Record Type With Fields",
    description: "A picklist of available Salesforce Record Types with their associated fields.",
  },
  inputs: selectRecordTypesWithFieldsInputs,
  perform: async (
    _context,
    {
      version,
      connection,
      defaultSelectedRecordTypes,
      recordTypeFilter,
      includeAllCustomRecordTypes,
      includeOnlyTopLevelRecordTypes,
      showTriggerableOnly,
    },
  ) => {
    const defaultSelectedSet = new Set(defaultSelectedRecordTypes);
    const includedTypesSet = new Set(recordTypeFilter);
    const httpClient = await createSalesforceHttpClient(version, connection);

    const {
      data: { sobjects },
    } = await httpClient.get("/sobjects");

    const objects: ObjectSelection = sobjects
      .filter(({ name, label, custom, isSubtype }) => {
        if (includeAllCustomRecordTypes && custom) {
          
          return true;
        }
        if (
          includedTypesSet.has((name as string).trim().toLowerCase()) ||
          includedTypesSet.has((label as string).trim().toLowerCase())
        ) {
          if (includeOnlyTopLevelRecordTypes && isSubtype) {
            
            return false;
          }
          return true;
        }
        return false;
      })
      .filter(({ triggerable }) => {
        if (showTriggerableOnly) {
          return triggerable;
        }
        return true;
      })
      .map(async ({ name, label }) => {
        const {
          data: { fields },
        } = await httpClient.get(`/sobjects/${util.types.toString(name)}/describe/`);

        return {
          object: { key: name, label },
          defaultSelected: defaultSelectedSet.has(name),
          fields: fields.map(({ label, name }) => ({
            key: name,
            label: label,
          })),
        };
      });

    return {
      result: await Promise.all(objects),
    };
  },
  dataSourceType: "objectSelection",
});
