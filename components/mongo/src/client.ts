import { type ActionLogger, util } from "@prismatic-io/spectral";
import type { Collection, Db, Document, MongoClient } from "mongodb";
import type {
  Collection as Collectionv4,
  Db as Dbv4,
  Document as Documentv4,
} from "mongodb4";
import type { ConnectionProps } from "./interfaces/ConnectionProps";
import { clientConnect } from "./util";

export const createClient = async ({
  connection,
  debug,
  logger,
}: ConnectionProps & { debug: boolean; logger: ActionLogger }): Promise<{
  dbConnection: MongoClient;
  client: Collection<Document> | Collectionv4<Documentv4>;
}> => {
  const client = await clientConnect(connection, debug, logger);
  const db = client.db(util.types.toString(connection.fields.database));

  return {
    dbConnection: client as MongoClient,
    client: db.collection(util.types.toString(connection.fields.collection)),
  };
};

export const getDbClient = async ({
  connection,
  debug,
  logger,
}: ConnectionProps & { debug: boolean; logger: ActionLogger }): Promise<{
  client: Db | Dbv4;
  connection: MongoClient;
}> => {
  const client = await clientConnect(connection, debug, logger);

  return {
    client: client.db(util.types.toString(connection.fields.database)),
    connection: client as MongoClient,
  };
};
