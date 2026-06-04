import { input, util } from "@prismatic-io/spectral";

function validateJSON(json: unknown) {
  try {
    return JSON.parse(util.types.toString(json));
  } catch (_err) {
    throw new Error("Invalid JSON format.");
  }
}

export const collection = input({
  label: "Collection",
  placeholder: "Collection Name",
  type: "string",
  required: true,
  comments: "Provide a string value for the collection name.",
  example: "Customers",
  dataSource: "selectCollection",
});

export const document = input({
  label: "Document",
  placeholder: "Document",
  type: "string",
  required: true,
  comments: "Provide a string value for the unique identifier of the document.",
  dataSource: "selectDocument",
  example: "/path/to/destination/file.txt",
});

export const data = input({
  label: "Data",
  placeholder: "Data",
  type: "data",
  required: true,
  collection: "keyvaluelist",
  comments: "Provide a key value pair that represents your data.",
});

export const fieldToRemove = input({
  label: "Field To Remove",
  placeholder: "firstName",
  example: "firstName",
  type: "string",
  required: true,
  comments:
    "Provide a string value for the name of the field you would like to remove from the document.",
});

export const projectId = input({
  label: "Project Id",
  type: "string",
  required: true,
  comments: "Provide the value from your generated Firebase Admin credential.",
});

export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
});

export const fieldFilter = input({
  label: "Field Filter",
  placeholder: "Field:Value",
  type: "string",
  required: false,
  comments:
    "Provide a string value for the field filter in the format 'Field:Value'.",
  example: "Name:John",
});

export const orderBy = input({
  label: "Order By",
  placeholder: "Field",
  type: "string",
  required: false,
  comments: "Provide a string value for the field to order by.",
  example: "Name",
});

export const documents = input({
  type: "code",
  label: "Documents",
  language: "json",
  comments: "An array of documents to be created in the collection.",
  required: true,
  default: JSON.stringify(
    [
      {
        field1: "value1",
        field2: "value2",
      },
      {
        field1: "value3",
        field2: "value4",
      },
    ],
    null,
    2,
  ),
  clean: (input) => {
    const output = validateJSON(input);
    return output;
  },
});

export const queryOperatorCode = input({
  label: "Query Operators",
  type: "code",
  language: "json",
  example: JSON.stringify([
    {
      field: "myFieldName",
      operator: "!=",
      value: "myFieldValue",
    },
    {
      field: "myOtherFieldName",
      operator: "not-in",
      value: ["myOtherFieldValue1", "myOtherFieldValue2"],
    },
  ]),
  clean: util.types.toString,
});

export const queryOperator = input({
  label: "Query Operators",
  placeholder: "field:operator:value,field2:operator2:value2,...",
  type: "string",
  required: false,
  comments:
    "Specify the query operators to use when filtering documents. Use the format 'field:operator:value' for each condition and separate multiple conditions with commas. Acceptable operators: '<', '<=', '==', '>', '>=', '!=', 'array-contains', 'array-contains-any', 'in', 'not-in'",
  clean: (value: unknown) => {
    const acceptableValues = [
      "<",
      "<=",
      "==",
      ">",
      ">=",
      "!=",
      "array-contains",
      "array-contains-any",
      "in",
      "not-in",
    ];
    util.types
      .toString(value)
      .split(",")
      .forEach((condition) => {
        const parts = condition.split(":");
        if (parts.length !== 3) {
          throw new Error(
            `Invalid condition format. Expected "field:operator:value", got "${condition}".`,
          );
        }
        if (!acceptableValues.includes(parts[1])) {
          throw new Error(
            "Invalid query operator. Acceptable values: " +
              acceptableValues.join(", "),
          );
        }
      });
    return value;
  },
});

export const selectDocumentInputs = {
  collection: {
    ...collection,
    dataSource: undefined,
  },
  firebaseConnection: connectionInput,
  queryOperatorCode,
  orderBy,
};

export const selectCollectionInputs = {
  firebaseConnection: connectionInput,
};
