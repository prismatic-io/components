import convertObjectId from "./convertObjectId";
import deleteMany from "./deleteMany";
import findAll from "./findAll";
import findOne from "./findOne";
import insertMany from "./insertMany";
import insertOne from "./insertOne";
import { rawRequest } from "./rawRequest";
import updateOne from "./updateOne";
import { updateMany } from "./updateMany";
import { aggregate } from "./aggregate";

export default {
  convertObjectId,
  deleteMany,
  findAll,
  findOne,
  insertMany,
  insertOne,
  updateOne,
  updateMany,
  rawRequest,
  aggregate,
};
