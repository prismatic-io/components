import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { MAX_ITEMS_PER_PAGE } from "../constants";
import type { ItamMeta, ItamOperation, ItamWriteResult } from "../types";
const CREATE_TRAILING_SLASH: Record<string, boolean> = {
  assets: true,
  devices: false,
  cloud_infrastructures: true,
  resources: true,
  "physical-subtypes": false,
};
export const itamPath = (
  resource: string,
  options: {
    op?: ItamOperation;
    id?: string | number;
  } = {},
): string => {
  const { op = "list", id } = options;
  const collection = `/itam/${resource}`;
  const requireId = (): string => {
    if (!id) {
      throw new Error(
        `Freshservice ITAM: the "${op}" operation on /itam/${resource} needs a record id, and none was supplied.`,
      );
    }
    return `${collection}/${id}`;
  };
  switch (op) {
    case "list":
      return collection;
    case "read":
      return requireId();
    case "create": {
      const slash = CREATE_TRAILING_SLASH[resource];
      if (slash === undefined) {
        throw new Error(
          `Freshservice ITAM: no recorded trailing-slash behavior for a POST to /itam/${resource}. Check the vendor's curl sample and add it to CREATE_TRAILING_SLASH — guessing sends the write to a URL that answers with list data and a 200.`,
        );
      }
      return slash ? `${collection}/` : collection;
    }
    case "updateByName":
      return `${collection}/`;
    case "update":
    case "delete":
      return `${requireId()}/`;
  }
};
export const getItamListData = async <T, K extends string>(
  client: HttpClient,
  resource: string,
  attribute: string,
  options: {
    fetchAll: boolean;
    params: Record<string, unknown>;
  },
): Promise<{
  data: {
    [P in K]: T[];
  };
  meta: ItamMeta;
}> => {
  const { fetchAll } = options;
  const params: Record<string, unknown> = { ...options.params };
  if (fetchAll) {
    params.per_page = MAX_ITEMS_PER_PAGE;
    params.page = 1;
  }
  const endpoint = itamPath(resource, { op: "list" });
  const readEnvelope = (body: Record<string, unknown>, page: number): T[] => {
    const items = body[attribute];
    if (items === undefined) {
      throw new Error(
        `Freshservice ITAM returned no "${attribute}" key on page ${page} of /itam/${resource}. The response shape changed or the envelope attribute is wrong.`,
      );
    }
    return items as T[];
  };
  const { data } = await client.get(endpoint, { params });
  const result = {
    [attribute]: readEnvelope(data, Number(params.page ?? 1)),
  } as {
    [P in K]: T[];
  };
  const meta = data.meta as ItamMeta | undefined;
  if (
    !meta ||
    typeof meta.total_count !== "number" ||
    typeof meta.per_page !== "number" ||
    meta.per_page <= 0
  ) {
    throw new Error(
      `Freshservice ITAM returned no usable "meta" object for /itam/${resource}. Page count cannot be derived, so pagination would silently return only the first page.`,
    );
  }
  if (!fetchAll) {
    return { data: result, meta };
  }
  const totalPages = Math.ceil(meta.total_count / meta.per_page);
  for (let page = 2; page <= totalPages; page++) {
    const { data: pageData } = await client.get(endpoint, {
      params: { ...params, page },
    });
    result[attribute as keyof typeof result] = result[
      attribute as keyof typeof result
    ].concat(readEnvelope(pageData, page));
  }
  return { data: result, meta };
};
export const normalizeItamWrite = (
  body: Record<string, unknown>,
): ItamWriteResult => {
  const msg = body?.msg;
  if (!Array.isArray(msg) || msg.length === 0) {
    throw new Error(
      'Freshservice ITAM returned no "msg" array for a write. The response shape changed.',
    );
  }
  const tuple: unknown[] = Array.isArray(msg[0]) ? msg[0] : msg;
  if (typeof tuple[0] !== "string") {
    throw new Error(
      'Freshservice ITAM returned an unexpected "msg" for a write. The documented shape is a tuple [action, id, name, did_something_change, is_it_new], optionally wrapped in an outer array.',
    );
  }
  const [action, id, name, didSomethingChange, isNew] = tuple;
  return {
    action: String(action),
    id: typeof id === "number" ? id : null,
    name: String(name),
    didSomethingChange: Boolean(didSomethingChange),
    isNew: Boolean(isNew),
    code: typeof body.code === "number" ? body.code : null,
    raw: tuple,
  };
};
