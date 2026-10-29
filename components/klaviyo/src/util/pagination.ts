import type {
  AdditionalFieldsProfile,
  FieldsCampaign,
  FieldsEvent,
  FieldsImage,
  FieldsList,
  FieldsMetric,
  FieldsProfile,
  FieldsProfileEvent,
  FieldsSegment,
  FieldsTemplate,
} from "../types";
import type {
  CampaignResponseObjectResource,
  CampaignsApi,
  EventResponseObjectResource,
  EventsApi,
  GetCampaignResponseCollectionCompoundDocument,
  GetEventResponseCollectionCompoundDocument,
  GetEventResponseCollectionCompoundDocumentIncludedInner,
  GetImageResponseCollection,
  GetListListResponseCollectionCompoundDocument,
  GetListMemberResponseCollection,
  GetProfileResponseCollection,
  GetSegmentListResponseCollectionCompoundDocument,
  GetTemplateDndResponseCollection,
  ImageResponseObjectResource,
  ImagesApi,
  ListListResponseObjectResource,
  ListMemberResponseObjectResourceExtended,
  ListsApi,
  ProfileResponseObjectResourceExtended,
  ProfilesApi,
  SegmentListResponseObjectResource,
  SegmentsApi,
  TemplateDndResponseObjectResourceExtended,
  TemplatesApi,
} from "klaviyo-api";

export const fetchCampaigns = async (
  campaignsApi: CampaignsApi,
  fieldsCampaign: FieldsCampaign[] | undefined,
  filterCampaigns: string,
  data: CampaignResponseObjectResource[] = [],
  next?: string,
): Promise<GetCampaignResponseCollectionCompoundDocument> => {
  const { body }: { body: GetCampaignResponseCollectionCompoundDocument } =
    await campaignsApi.getCampaigns(filterCampaigns, {
      fieldsCampaign,
      pageCursor: next,
    });
  data.push(...body.data);
  if (body.links?.next) {
    return fetchCampaigns(
      campaignsApi,
      fieldsCampaign,
      filterCampaigns,
      data,
      body.links?.next,
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
  data: EventResponseObjectResource[] = [],
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

  if (body.links?.next) {
    return fetchEvents(
      eventsApi,
      fieldsEvent,
      fieldsMetric,
      fieldsProfile,
      data,
      includedData,
      body.links?.next,
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
  if (body.links?.next) {
    return fetchImages(imagesApi, fieldsImage, data, body.links?.next);
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
  data: ListMemberResponseObjectResourceExtended[] = [],
  next?: string,
): Promise<GetListMemberResponseCollection> => {
  const { body }: { body: GetListMemberResponseCollection } =
    await listsApi.getListProfiles(listId, {
      additionalFieldsProfile,
      fieldsProfile,
      pageCursor: next,
    });
  data.push(...body.data);
  if (body.links?.next) {
    return fetchListProfiles(
      listsApi,
      listId,
      additionalFieldsProfile,
      fieldsProfile,
      data,
      body.links?.next,
    );
  } else {
    body.data = data;
    return body;
  }
};

export const fetchLists = async (
  listsApi: ListsApi,
  fieldsList: FieldsList[] | undefined,
  data: ListListResponseObjectResource[] = [],
  next?: string,
): Promise<GetListListResponseCollectionCompoundDocument> => {
  const { body }: { body: GetListListResponseCollectionCompoundDocument } =
    await listsApi.getLists({
      fieldsList,
      pageCursor: next,
    });
  data.push(...body.data);
  if (body.links?.next) {
    return fetchLists(listsApi, fieldsList, data, body.links?.next);
  } else {
    body.data = data;
    return body;
  }
};

export const fetchProfile = async (
  profilesApi: ProfilesApi,
  fieldsProfile: FieldsProfile[] | undefined,
  additionalFieldsProfile: AdditionalFieldsProfile[] | undefined,
  data: ProfileResponseObjectResourceExtended[] = [],
  next?: string,
): Promise<GetProfileResponseCollection> => {
  const { body }: { body: GetProfileResponseCollection } =
    await profilesApi.getProfiles({
      fieldsProfile,
      additionalFieldsProfile,
      pageCursor: next,
    });
  data.push(...body.data);
  if (body.links?.next) {
    return fetchProfile(
      profilesApi,
      fieldsProfile,
      additionalFieldsProfile,
      data,
      body.links?.next,
    );
  } else {
    body.data = data;
    return body;
  }
};

export const fetchSegments = async (
  segmentsApi: SegmentsApi,
  fieldsSegment: FieldsSegment[] | undefined,
  data: SegmentListResponseObjectResource[] = [],
  next?: string,
): Promise<GetSegmentListResponseCollectionCompoundDocument> => {
  const { body }: { body: GetSegmentListResponseCollectionCompoundDocument } =
    await segmentsApi.getSegments({
      fieldsSegment,
      pageCursor: next,
    });
  data.push(...body.data);
  if (body.links?.next) {
    return fetchSegments(segmentsApi, fieldsSegment, data, body.links?.next);
  } else {
    body.data = data;
    return body;
  }
};

export const fetchTemplates = async (
  templatesApi: TemplatesApi,
  fieldsTemplate: FieldsTemplate[] | undefined,
  data: TemplateDndResponseObjectResourceExtended[] = [],
  next?: string,
): Promise<GetTemplateDndResponseCollection> => {
  const { body }: { body: GetTemplateDndResponseCollection } =
    await templatesApi.getTemplates({
      fieldsTemplate,
      pageCursor: next,
    });
  data.push(...body.data);
  if (body.links?.next) {
    return fetchTemplates(templatesApi, fieldsTemplate, data, body.links?.next);
  } else {
    body.data = data;
    return body;
  }
};
