import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import connections from "./connections";
import { getApi } from "./api";
import { KlaviyoApi } from "./enums/KlaviyoApi";
import type { KlaviyoPollableResource, KlaviyoRecord } from "./types/polling";
import type {
  CampaignsApi,
  EventsApi,
  GetCampaignResponseCollectionCompoundDocument,
  GetCampaignResponseCollectionCompoundDocumentDataInner,
  GetEventResponseCollectionCompoundDocument,
  GetEventResponseCollectionCompoundDocumentDataInner,
  GetEventResponseCollectionCompoundDocumentIncludedInner,
  GetImageResponseCollection,
  GetListListResponseCollectionCompoundDocument,
  GetListListResponseCollectionCompoundDocumentDataInner,
  GetListMemberResponseCollection,
  GetListMemberResponseCollectionDataInner,
  GetProfileResponseCollectionCompoundDocument,
  GetProfileResponseData,
  GetSegmentListResponseCollectionCompoundDocument,
  GetSegmentListResponseCollectionCompoundDocumentDataInner,
  GetTemplateResponseCollection,
  ImageResponseObjectResource,
  ImagesApi,
  ListsApi,
  ProfilesApi,
  SegmentsApi,
  TemplateResponseObjectResource,
  TemplatesApi,
} from "klaviyo-api";
import type { FieldsCampaign } from "./types/FieldsCampaign";
import type { FieldsEvent } from "./types/FieldsEvent";
import type { FieldsImage } from "./types/FieldsImage";
import type { AdditionalFieldsProfile } from "./types/AdditionalFieldsProfile";
import type { FieldsProfile } from "./types/FieldsProfile";
import type { FieldsList } from "./types/FieldsList";
import type { FieldsSegment } from "./types/FieldsSegment";
import type { FieldsTemplate } from "./types/FieldsTemplate";
import type { FieldsMetric } from "./types/FieldsMetric";
import type { FieldsProfileEvent } from "./types/FieldsProfileEvent";

export const validateConnection = (connection: Connection): void => {
  const connectionKeys = connections.map((c) => c.key);
  if (!connectionKeys.includes(connection.key)) {
    throw new ConnectionError(
      connection,
      `Unsupported connection ${connection.key}.`,
    );
  }
};

export const cleanStringInput = (value: unknown) =>
  value ? util.types.toString(value) : undefined;

export const cleanNumberInput = (value: unknown) =>
  value ? util.types.toNumber(value) : undefined;

export const cleanValueListInput = (value: unknown): string[] | undefined => {
  if (Array.isArray(value)) {
    return value.length > 0 ? value : undefined;
  }
  return undefined;
};

export const cleanBooleanInput = (value: unknown) =>
  value ? util.types.toBool(value) : undefined;

const throwCodeInputError = (inputLabel: string) => {
  throw new Error(`Invalid code for ${inputLabel} input.`);
};

export const cleanCodeInput = (value: unknown, inputLabel: string) => {
  if (value) {
    try {
      return util.types.toObject(value);
    } catch (error) {
      throwCodeInputError(inputLabel);
    }
  }
  return undefined;
};

export const cleanArrayCodeInput = (value: unknown, inputLabel: string) => {
  if (value) {
    let object: unknown;
    try {
      object = util.types.toObject(value);
    } catch (error) {
      throwCodeInputError(inputLabel);
    }
    if (Array.isArray(object)) {
      return object;
    }
    throw new Error(`Invalid array for ${inputLabel} input.`);
  }
  return undefined;
};

export const cleanDate = (value: unknown, inputLabel: string) => {
  if (value) {
    const date = new Date(util.types.toString(value));
    if (!isNaN(date.getTime())) {
      return date;
    }
    throw new Error(`Invalid date for ${inputLabel} input.`);
  }
  return undefined;
};

export const bufferToDataUri = (buffer: Buffer, mimeType: string): string => {
  const base64String = buffer.toString("base64");
  return `data:${mimeType};base64,${base64String}`;
};

export const fetchCampaigns = async (
  campaignsApi: CampaignsApi,
  fieldsCampaign: FieldsCampaign[] | undefined,
  filterCampaigns: string,
  data: GetCampaignResponseCollectionCompoundDocumentDataInner[] = [],
  next?: string,
): Promise<GetCampaignResponseCollectionCompoundDocument> => {
  const { body }: { body: GetCampaignResponseCollectionCompoundDocument } =
    await campaignsApi.getCampaigns(filterCampaigns, {
      fieldsCampaign,
      pageCursor: next,
    });
  data.push(...body.data);
  if (body.links.next) {
    return fetchCampaigns(
      campaignsApi,
      fieldsCampaign,
      filterCampaigns,
      data,
      body.links.next,
    );
  } else {
    body.data = data;
    return body;
  }
};

export const getIncludeParams = (
  fieldsProfile: FieldsProfileEvent[] | undefined,
  fieldsMetric: FieldsMetric[] | undefined,
): ("attributions" | "metric" | "profile")[] => {
  const include: ("attributions" | "metric" | "profile")[] = [];
  if (fieldsProfile && fieldsProfile.length > 0) {
    include.push("profile");
  }
  if (fieldsMetric && fieldsMetric.length > 0) {
    include.push("metric");
  }
  return include;
};

export const fetchEvents = async (
  eventsApi: EventsApi,
  fieldsEvent: FieldsEvent[] | undefined,
  fieldsMetric: FieldsMetric[] | undefined,
  fieldsProfile: FieldsProfileEvent[] | undefined,
  data: GetEventResponseCollectionCompoundDocumentDataInner[] = [],
  includedData: GetEventResponseCollectionCompoundDocumentIncludedInner[] = [],
  next?: string,
): Promise<GetEventResponseCollectionCompoundDocument> => {
  const include = getIncludeParams(fieldsProfile, fieldsMetric);
  const { body }: { body: GetEventResponseCollectionCompoundDocument } =
    await eventsApi.getEvents({
      fieldsEvent,
      fieldsMetric,
      fieldsProfile,
      pageCursor: next,
      include,
    });

  
  if (body.included && body.included.length > 0) {
    const existingIds = new Set(includedData.map((item) => item.id));
    const newItems = body.included.filter((item) => !existingIds.has(item.id));
    includedData.push(...newItems);
  }

  data.push(...body.data);

  if (body.links.next) {
    return fetchEvents(
      eventsApi,
      fieldsEvent,
      fieldsMetric,
      fieldsProfile,
      data,
      includedData,
      body.links.next,
    );
  } else {
    body.data = data;
    if (includedData.length > 0) {
      body.included = includedData;
    }
    return body;
  }
};

export const fetchImages = async (
  imagesApi: ImagesApi,
  fieldsImage: FieldsImage[] | undefined,
  data: ImageResponseObjectResource[] = [],
  next?: string,
): Promise<GetImageResponseCollection> => {
  const { body }: { body: GetImageResponseCollection } =
    await imagesApi.getImages({
      fieldsImage,
      pageCursor: next,
    });
  data.push(...body.data);
  if (body.links.next) {
    return fetchImages(imagesApi, fieldsImage, data, body.links.next);
  } else {
    body.data = data;
    return body;
  }
};

export const fetchListProfiles = async (
  listsApi: ListsApi,
  listId: string,
  additionalFieldsProfile: AdditionalFieldsProfile[] | undefined,
  fieldsProfile: FieldsProfile[] | undefined,
  data: GetListMemberResponseCollectionDataInner[] = [],
  next?: string,
): Promise<GetListMemberResponseCollection> => {
  const { body }: { body: GetListMemberResponseCollection } =
    await listsApi.getListProfiles(listId, {
      additionalFieldsProfile,
      fieldsProfile,
      pageCursor: next,
    });
  data.push(...body.data);
  if (body.links.next) {
    return fetchListProfiles(
      listsApi,
      listId,
      additionalFieldsProfile,
      fieldsProfile,
      data,
      body.links.next,
    );
  } else {
    body.data = data;
    return body;
  }
};

export const fetchLists = async (
  listsApi: ListsApi,
  fieldsList: FieldsList[] | undefined,
  data: GetListListResponseCollectionCompoundDocumentDataInner[] = [],
  next?: string,
): Promise<GetListListResponseCollectionCompoundDocument> => {
  const { body }: { body: GetListListResponseCollectionCompoundDocument } =
    await listsApi.getLists({
      fieldsList,
      pageCursor: next,
    });
  data.push(...body.data);
  if (body.links.next) {
    return fetchLists(listsApi, fieldsList, data, body.links.next);
  } else {
    body.data = data;
    return body;
  }
};

export const fetchProfile = async (
  profilesApi: ProfilesApi,
  fieldsProfile: FieldsProfile[] | undefined,
  additionalFieldsProfile: AdditionalFieldsProfile[] | undefined,
  data: GetProfileResponseData[] = [],
  next?: string,
): Promise<GetProfileResponseCollectionCompoundDocument> => {
  const { body }: { body: GetProfileResponseCollectionCompoundDocument } =
    await profilesApi.getProfiles({
      fieldsProfile,
      additionalFieldsProfile,
      pageCursor: next,
    });
  data.push(...body.data);
  if (body.links.next) {
    return fetchProfile(
      profilesApi,
      fieldsProfile,
      additionalFieldsProfile,
      data,
      body.links.next,
    );
  } else {
    body.data = data;
    return body;
  }
};

export const fetchSegments = async (
  segmentsApi: SegmentsApi,
  fieldsSegment: FieldsSegment[] | undefined,
  data: GetSegmentListResponseCollectionCompoundDocumentDataInner[] = [],
  next?: string,
): Promise<GetSegmentListResponseCollectionCompoundDocument> => {
  const { body }: { body: GetSegmentListResponseCollectionCompoundDocument } =
    await segmentsApi.getSegments({
      fieldsSegment,
      pageCursor: next,
    });
  data.push(...body.data);
  if (body.links.next) {
    return fetchSegments(segmentsApi, fieldsSegment, data, body.links.next);
  } else {
    body.data = data;
    return body;
  }
};

export const fetchTemplates = async (
  templatesApi: TemplatesApi,
  fieldsTemplate: FieldsTemplate[] | undefined,
  data: TemplateResponseObjectResource[] = [],
  next?: string,
): Promise<GetTemplateResponseCollection> => {
  const { body }: { body: GetTemplateResponseCollection } =
    await templatesApi.getTemplates({
      fieldsTemplate,
      pageCursor: next,
    });
  data.push(...body.data);
  if (body.links.next) {
    return fetchTemplates(templatesApi, fieldsTemplate, data, body.links.next);
  } else {
    body.data = data;
    return body;
  }
};

export const getAuthorizationHeader = (
  connection: Connection,
): { Authorization: string } => {
  let authorization = "";
  switch (connection.key) {
    case "klaviyoApiKeyConnection":
      authorization = `Klaviyo-API-Key ${util.types.toString(connection.fields.apiKey)}`;

      break;
    case "klaviyoOAuth2Connection":
      authorization = `Bearer ${util.types.toString(connection.token?.access_token)}`;
      break;
  }

  return { Authorization: authorization };
};








export const filterByTimestamp = (
  records: KlaviyoRecord[],
  lastPolledAt: string,
  createdAtField: string,
  updatedAtField: string,
  includeNew: boolean,
  includeUpdated: boolean,
): { created: KlaviyoRecord[]; updated: KlaviyoRecord[] } => {
  const lastPolledAtDate = new Date(lastPolledAt);
  const created: KlaviyoRecord[] = [];
  const updated: KlaviyoRecord[] = [];

  for (const record of records) {
    const attrs = record.attributes;
    const rawCreatedAt = attrs[createdAtField];
    const rawUpdatedAt = attrs[updatedAtField];

    const createdAtDate =
      typeof rawCreatedAt === "string" ? new Date(rawCreatedAt) : null;
    const updatedAtDate =
      typeof rawUpdatedAt === "string" ? new Date(rawUpdatedAt) : null;

    const isNew = createdAtDate !== null && createdAtDate > lastPolledAtDate;
    const isUpdated =
      !isNew && updatedAtDate !== null && updatedAtDate > lastPolledAtDate;

    if (isNew && includeNew) {
      created.push(record);
    } else if (isUpdated && includeUpdated) {
      updated.push(record);
    }
  }

  return { created, updated };
};




export const fetchProfileOrListRecords = async (
  conn: Parameters<typeof getApi>[0],
  resourceType: KlaviyoPollableResource,
  filter?: string,
): Promise<KlaviyoRecord[]> => {
  const all: KlaviyoRecord[] = [];
  let next: string | undefined;
  if (resourceType === "profiles") {
    const api = getApi(conn, KlaviyoApi.Profiles);
    do {
      const { body } = await api.getProfiles({ pageCursor: next, filter });
      all.push(...(body.data as unknown as KlaviyoRecord[]));
      next = body.links.next;
    } while (next);
    return all;
  }
  const api = getApi(conn, KlaviyoApi.Lists);
  do {
    const { body } = await api.getLists({ pageCursor: next, filter });
    all.push(...(body.data as unknown as KlaviyoRecord[]));
    next = body.links.next;
  } while (next);
  return all;
};





export const fetchCampaignRecords = async (
  conn: Parameters<typeof getApi>[0],
  filter: string,
): Promise<KlaviyoRecord[]> => {
  const api = getApi(conn, KlaviyoApi.Campaigns);
  const result = await fetchCampaigns(
    api,
    undefined as unknown as FieldsCampaign[],
    filter,
    [],
    undefined,
  );
  return result.data as unknown as KlaviyoRecord[];
};
