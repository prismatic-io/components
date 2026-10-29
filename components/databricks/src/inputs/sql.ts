import { input, util } from "@prismatic-io/spectral";

export const sqlStatementInput = input({
  label: "SQL Statement",
  type: "string",
  required: true,
  comments:
    "The SQL statement to execute against the Databricks SQL warehouse.",
  example: "SELECT * FROM table",
  placeholder: "Enter SQL statement",
  clean: util.types.toString,
});

export const sqlParametersInput = input({
  label: "SQL Parameters",
  type: "code",
  language: "json",
  required: false,
  comments:
    'The parameters to use in the SQL statement. This should represent an array of objects, and each object should have a name and value. For example, [{ "name": "my_name", "value": "the name" }',
  clean: (value) => (value ? util.types.toObject(value) : undefined),
});
