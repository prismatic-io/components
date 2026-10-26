import { input, util } from "@prismatic-io/spectral";
import { SERVICES, WORKDAY_API_DOCS_URL } from "../constants";
import {
  connection,
  paginationQueryStringInputs,
  extraParameters,
} from "./common";
const personId = input({
  label: "Person ID",
  comments: "Unique identifier for a person in the Workday tenant.",
  type: "string",
  example: "3aa5550b7fe348b98d7b5741afc65534",
  placeholder: "Enter person ID",
  required: true,
  clean: util.types.toString,
  dataSource: "selectPerson",
});
const listPeopleParamsComments = `${extraParameters.comments} See optional (QUERY-STRING PARAMETERS) in the [Workday API documentation](${WORKDAY_API_DOCS_URL}#${SERVICES.person.slice(1)}/get-/people).`;
export const getPersonByIdInputs = {
  connection,
  personId,
};
export const listPeopleInputs = {
  connection,
  ...paginationQueryStringInputs,
  extraParameters: { ...extraParameters, comments: listPeopleParamsComments },
};
