import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import Odoo from "odoo-await";
import {
  DEFAULT_PAGE_SIZE,
  FETCH_ALL_PAGE_SIZE,
  LEGACY_CONNECTION_KEY,
} from "./constants";
import type {
  FetchPollPage,
  LegacyPagination,
  OdooRecord,
  PollPageQuery,
} from "./types";

export const isLegacyConnection = (connection: Connection): boolean =>
  connection.key === LEGACY_CONNECTION_KEY;

export const createOdooAwaitClient = async (
  connection: Connection,
): Promise<Odoo> => {
  if (!isLegacyConnection(connection)) {
    throw new ConnectionError(
      connection,
      "This operation requires the Basic Authentication (Deprecated) connection. Switch the step to that connection, or use the API Key variant of this action.",
    );
  }
  const { baseUrl, port, db, username, password } = connection.fields;
  const client = new Odoo({
    baseUrl: util.types.toString(baseUrl),
    port: port ? util.types.toNumber(port) : undefined,
    db: util.types.toString(db),
    username: util.types.toString(username),
    password: util.types.toString(password),
  });
  try {
    await client.connect();
  } catch (err) {
    throw new ConnectionError(
      connection,
      `An error occurred while trying to connect to Odoo using the provided connection configuration. ${err}`,
    );
  }
  return client;
};

export const paginateSearchLegacy = async <T>({
  client,
  model,
  params,
  fetchAll,
  filter,
  fields,
}: LegacyPagination): Promise<T[]> => {
  const limit = util.types.toNumber(params?.limit) || DEFAULT_PAGE_SIZE;
  const records: T[] = [];
  let offset = util.types.toNumber(params?.offset) || 0;
  let keepFetching = true;
  if (fetchAll) {
    do {
      const data = await client.searchRead<T>(model, filter, fields, {
        limit: FETCH_ALL_PAGE_SIZE,
        offset,
      });
      offset += FETCH_ALL_PAGE_SIZE;
      if (data.length < FETCH_ALL_PAGE_SIZE) {
        keepFetching = false;
      }
      records.push(...data);
    } while (keepFetching);
  } else {
    const data = await client.searchRead<T>(model, filter, fields, {
      limit,
      offset,
    });
    records.push(...data);
  }
  return records;
};

export const fetchOdooPageLegacy =
  (client: Odoo, model: string): FetchPollPage =>
  async ({ domain, order, limit }: PollPageQuery): Promise<OdooRecord[]> =>
    client.searchRead<OdooRecord>(model, domain, [], { limit, order });
