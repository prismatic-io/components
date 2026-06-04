import { type Connection, util } from "@prismatic-io/spectral";
import Odoo from "odoo-await";
import {
  LEGACY_CONNECTION_KEY,
  MAX_POLL_PAGES,
  POLL_PAGE_SIZE,
} from "./constants";
import type { LegacyPagination, OdooRecord } from "./types";
import { toOdooDate } from "./util";

export const isLegacyConnection = (connection: Connection): boolean =>
  connection.key === LEGACY_CONNECTION_KEY;

export const createOdooAwaitClient = async (
  connection: Connection,
): Promise<Odoo> => {
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
    throw new Error(
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
  const limit = util.types.toNumber(params?.limit) || 100;
  const records: T[] = [];
  let offset = util.types.toNumber(params?.offset) || 0;
  let keepFetching = true;
  if (fetchAll) {
    do {
      const data = await client.searchRead<T>(model, filter, fields, {
        limit: 1000,
        offset,
      });
      offset += 1000;
      if (data.length < 1000) {
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

export const fetchOdooRecordsSinceLegacy = async (
  client: Odoo,
  model: string,
  lastPolledAt: string,
): Promise<{ records: OdooRecord[]; truncated: boolean }> => {
  const domain = [["write_date", ">=", toOdooDate(lastPolledAt)]];
  const records: OdooRecord[] = [];
  for (let page = 0; page < MAX_POLL_PAGES; page++) {
    const batch = await client.searchRead<OdooRecord>(model, domain, [], {
      limit: POLL_PAGE_SIZE,
      offset: page * POLL_PAGE_SIZE,
      order: "write_date desc",
    });
    records.push(...batch);
    if (batch.length < POLL_PAGE_SIZE) {
      return { records, truncated: false };
    }
  }
  return { records, truncated: true };
};
