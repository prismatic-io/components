import { dataSource, util, type ObjectFieldMap } from "@prismatic-io/spectral";
import { createSalesforceHttpClient } from "../../client";
import { mapRecordTypeFieldsInputs } from "../../inputs";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import type { NestedRecord, SupplementalData } from "../../types";

export const mapRecordTypeFields = dataSource({
  display: {
    label: "Map Record Type Fields",
    description: "A map of a list of fields to Salesforce Record Type fields.",
  },
  inputs: mapRecordTypeFieldsInputs,
  perform: async (
    _context,
    { version, connection, mappingFields, objectSelection, includeSupplementalMetadata },
  ) => {
    
    const httpClient = await createSalesforceHttpClient(version, connection);
    const recordTypeMetadata = (
      await Promise.all(
        objectSelection.map(async ({ object: { key: recordType } }) => {
          try {
            const { data } = await httpClient.get(`/sobjects/${recordType}/describe/`);
            return { recordType, data };
          } catch (error) {
            throw new Error(util.types.toJSON(handleErrors(error)));
          }
        }),
      )
    ).reduce<NestedRecord>((prev, { recordType, data }) => {
      prev[recordType] = data;
      return prev;
    }, {});

    
    type Fields = { name: string; label: string }[];
    const options = objectSelection.map(({ object: { key: recordType, label } }) => ({
      object: { key: recordType, label },
      fields: ((recordTypeMetadata?.[recordType]?.fields as Fields) || []).map(
        ({ name, label }) => ({ key: name, label }),
      ),
    }));

    
    
    
    const result: ObjectFieldMap = {
      ...mappingFields,
      options,
    };

    
    
    let supplementalData: SupplementalData;
    if (includeSupplementalMetadata) {
      supplementalData = {
        data: recordTypeMetadata,
        contentType: "application/json",
      };
    }

    return {
      result,
      supplementalData,
    };
  },
  dataSourceType: "objectFieldMap",
  detailDataSource: "previewRecordTypeFieldValues",
});
