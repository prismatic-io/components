import { input, util } from "@prismatic-io/spectral";
import {
  additionalFields,
  boardId,
  companyId,
  connection,
  cursor,
  fetchAll,
  limit,
  postId,
  postIdOptional,
  userIdOptional,
} from "./common";

const voteId = input({
  label: "Vote ID",
  type: "string",
  required: true,
  comments: "The unique identifier of the vote.",
  clean: util.types.toString,
  placeholder: "Enter vote ID",
  example: "553c3ef8b8cdcd1501ba3333",
});

const voterId = input({
  label: "Voter ID",
  type: "string",
  required: true,
  comments: "The unique identifier of the user casting the vote.",
  clean: util.types.toString,
  dataSource: "selectUser",
  placeholder: "Enter voter ID",
  example: "553c3ef8b8cdcd1501ba9999",
});

export const listVotesInputs = {
  connection,
  boardId,
  postIdOptional,
  companyId,
  userIdOptional,
  fetchAll,
  cursor,
  limit,
};

export const retrieveVoteInputs = { connection, voteId };

export const createVoteInputs = {
  connection,
  postId,
  voterId,
  additionalFields,
};

export const deleteVoteInputs = { connection, voteId };
