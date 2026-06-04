import { dataSource, type ObjectSelection } from "@prismatic-io/spectral";
import { createSalesforceHttpClient } from "../../client";
import { selectRecordTypesInputs } from "../../inputs";

export const selectRecordTypes = dataSource({
  display: {
    label: "Select Record Type",
    description: "A picklist of available Salesforce Record Types.",
  },
  inputs: selectRecordTypesInputs,
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
        if (includeOnlyTopLevelRecordTypes && isSubtype) {
          
          return false;
        }
        if (includeAllCustomRecordTypes && custom) {
          
          return true;
        }
        if (includedTypesSet.size > 0) {
          
          return (
            includedTypesSet.has((name as string).trim().toLowerCase()) ||
            includedTypesSet.has((label as string).trim().toLowerCase())
          );
        }

        return true;
      })
      .filter(({ triggerable }) => {
        if (showTriggerableOnly) {
          return triggerable;
        }
        return true;
      })
      .map(({ name, label }) => ({
        object: { key: name, label },
        defaultSelected: defaultSelectedSet.has(name),
        fields: [],
      }));

    return {
      result: objects,
    };
  },
  dataSourceType: "objectSelection",
  detailDataSource: "previewRecordTypeFields",
});
