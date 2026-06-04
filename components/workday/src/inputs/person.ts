import { input, util } from "@prismatic-io/spectral";
import { SERVICES } from "../constants";
import { connection, paginationQueryStringInputs, params } from "./shared";

const personId = input({
  label: "Person ID",
  comments: "Unique identifier for a person in the Workday tenant.",
  type: "string",
  example: "",
  placeholder: "Enter person ID",
  required: true,
  clean: util.types.toString,
  dataSource: "selectPerson",
});

const listPeopleParamsComments = `${params.comments} See optional (QUERY-STRING PARAMETERS) at https://community.workday.com/sites/default/files/file-hosting/restapi/index.html#${SERVICES.person.slice(1)}/get-/people`;

export const getPersonByIdInputs = {
  connection,
  personId,
};

export const listPeopleInputs = {
  connection,
  ...paginationQueryStringInputs,
  params: { ...params, comments: listPeopleParamsComments },
};
