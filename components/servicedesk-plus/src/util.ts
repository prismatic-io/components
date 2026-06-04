import {
  type Connection,
  type KeyValuePair,
  util,
} from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { oauth2 } from "./connections";
import {
  MISSING_AUTHENTICATION,
  MISSING_CONNECTION_FIELD,
  UNSUPPORTED_CONNECTION_TYPE,
} from "./constants";
import type { MapModel, ObjectType, SearchCriteria } from "./interfaces";

export const mapModel = (array: MapModel[], includeEmpty = false) => {
  if (!Array.isArray(array)) throw new Error("Expected an array");
  const modelArray = array.map(({ label, value }) => ({
    label,
    value,
  }));
  if (includeEmpty) return [{ label: "", value: "" }, ...modelArray];
  return modelArray;
};

export const validateConnection = (connection: Connection) => {
  if (connection.key !== oauth2.key) {
    throw new Error(UNSUPPORTED_CONNECTION_TYPE);
  }

  if (
    !connection.fields.clientId ||
    !connection.fields.clientSecret ||
    !connection.fields.dataCenter
  ) {
    throw new Error(MISSING_CONNECTION_FIELD);
  }

  if (!connection.token?.access_token) {
    throw new Error(MISSING_AUTHENTICATION);
  }
};

export const cleanString = (value: unknown) =>
  value ? util.types.toString(value) : undefined;

export const cleanBool = (value: unknown) =>
  value ? util.types.toBool(value) : undefined;

export const cleanKeyValueListInput = (value: unknown) =>
  value
    ? util.types.keyValPairListToObject(
        value as KeyValuePair[],
        util.types.toObject,
      )
    : undefined;

export const cleanObject = (value: unknown) =>
  value ? util.types.toObject(value) : undefined;

export const cleanValueListInput = (value: unknown): string[] | undefined => {
  if (Array.isArray(value)) {
    return value.length > 0 ? value : undefined;
  }
  return undefined;
};

export const cleanNumber = (value: unknown) =>
  value ? util.types.toNumber(value, 1) : undefined;

export const createPayload = (params: ObjectType) => ({
  input_data: JSON.stringify(params),
});

export const createConfigurationItemPayload = (
  ciTypeApiName: string,
  params: ObjectType,
) => {
  const ciConfigurationObject = Object.create({});
  ciConfigurationObject[ciTypeApiName] = {
    ...params,
  };
  return createPayload(ciConfigurationObject);
};

const compareArrayLengths = (arrays: KeyValuePair<unknown>[][]) => {
  const firstArrayLength = arrays[0].length;
  return arrays.every((array) => array.length === firstArrayLength);
};
















const getSearchCriteria = (
  conditionsCriteriaValue: KeyValuePair<unknown>[],
  criteria: ObjectType,
) => {
  let searchCriteriaParams: ObjectType[] | ObjectType | undefined;
  for (const [index, item] of conditionsCriteriaValue.entries()) {
    const { key, value } = item;
    if (!criteria[key]) {
      throw new Error(`Key ${key} not found in criteria object.`);
    }
    const searchCriteria: ObjectType = {
      field: key,
      condition: criteria[key],
    };
    if (conditionsCriteriaValue.length > 1) {
      if (Array.isArray(value)) {
        searchCriteria.values = value;
      } else {
        searchCriteria.value = value;
      }
      if (index > 0) {
        searchCriteria.logical_operator = "and";
      }
      searchCriteriaParams = [
        ...((searchCriteriaParams as unknown as ObjectType[]) || []),
        searchCriteria,
      ];
    } else {
      searchCriteria.value = value;
      searchCriteriaParams = searchCriteria;
    }
  }
  return searchCriteriaParams;
};

const processSearchCriteria = (searchCriteria: SearchCriteria) => {
  const { conditionsCriteria, conditionsCriteriaValue } = searchCriteria;

  if (!compareArrayLengths([conditionsCriteria, conditionsCriteriaValue])) {
    throw new Error(
      "The number of Conditions and Values must be the same. Check your inputs.",
    );
  }
  if (conditionsCriteriaValue.length === 0) {
    return undefined;
  }

  const criteria = cleanKeyValueListInput(conditionsCriteria) as ObjectType;

  return getSearchCriteria(conditionsCriteriaValue, criteria);
};

export const paginateData = async (
  client: HttpClient,
  listName: string,
  rowCount = 100,
  page = 1,
  fetchAll = true,
  searchCriteria: SearchCriteria | undefined = undefined,
  isCmdb = false,
  overrideURL?: string,
) => {
  let searchCriteriaParams: ObjectType[] | ObjectType | undefined;
  if (searchCriteria) {
    searchCriteriaParams = processSearchCriteria(searchCriteria);
  }
  let items: ObjectType[] = [];
  let has_more = true;
  let index = 1;
  let fetchedData = null;
  const URL = overrideURL || (isCmdb ? `/cmdb/${listName}` : `/${listName}`);
  if (fetchAll) {
    do {
      const inputData = JSON.stringify({
        list_info: {
          row_count: 100,
          page: index,
          search_criteria: searchCriteriaParams,
        },
      });
      const encodedInputData = encodeURIComponent(inputData);
      const data = await sendRequest(
        client,
        {},
        `${URL}?input_data=${encodedInputData}`,
      );
      const { list_info } = data;
      const { has_more_rows } = list_info;
      has_more = has_more_rows;
      items = [...items, ...data[listName]];
      fetchedData = data;
      index++;
    } while (has_more);

    const returnedData = Object.create({});
    returnedData[listName] = items;

    return {
      ...fetchedData,
      ...returnedData,
    };
  }
  const inputData = JSON.stringify({
    list_info: {
      row_count: rowCount,
      page,
      search_criteria: searchCriteriaParams,
    },
  });
  const encodedInputData = encodeURIComponent(inputData);
  const data = await sendRequest(
    client,
    {},
    `${URL}?input_data=${encodedInputData}`,
  );
  return data;
};

const sendRequest = async (
  client: HttpClient,
  params: ObjectType,
  URL: string,
) => {
  const { data } = await client.get(URL, {
    params,
  });
  return data;
};

export const buildCriteriaObject = (
  conditionsCriteria: KeyValuePair<unknown>[],
  conditionsCriteriaValue: KeyValuePair<unknown>[],
): SearchCriteria | undefined => {
  const criteriaData =
    conditionsCriteria?.length > 0 && conditionsCriteriaValue?.length > 0
      ? {
          conditionsCriteria,
          conditionsCriteriaValue,
        }
      : undefined;
  return criteriaData;
};
