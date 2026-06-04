import { input } from "@prismatic-io/spectral";
import { connection } from "../common";
import { problemId } from "./common";

export const deleteProblemInputs = {
  connection,
  problemId: input({ ...problemId, comments: "ID of the Problem to delete." }),
};
