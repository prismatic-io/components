import type { ElementWithLabel, GetRecordDataSource } from "../types";
import { executeSFAction, getFindQuery, mapToElement } from "./query";

export const getRecordsForDatasource = async ({
  context,
  salesforceClient,
  recordType,
  labelKey = "Name",
  valueKey = "Id",
  sortValueInput,
}: GetRecordDataSource) => {
  const sortValue = sortValueInput || "-CreatedDate";
  const query = getFindQuery({
    dynamicValues: {},
    fetchAll: true,
    fieldValues: {},
    fieldValueTypes: [],
    maxRecordsToFetch: 20000,
    pageNumber: undefined,
    pageSize: undefined,
    salesforceClient,
    sortValue,
    recordType,
  });
  const command = query.execute();
  const response = (await executeSFAction(context, command)) as Record<string, unknown>[];
  const objects = mapToElement(response, labelKey, valueKey);
  return objects;
};

export const filterAndSort = (items: ElementWithLabel[], searchQuery: string | undefined) => {
  return items
    .filter((item) =>
      searchQuery ? item.label.toLowerCase().includes(searchQuery.toLowerCase()) : true,
    )
    .sort((a, b) => a.label.localeCompare(b.label));
};
