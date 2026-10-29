import type {
  GetSegmentListResponseCollectionCompoundDocument,
  GetSegmentRetrieveResponseCompoundDocument,
  PatchSegmentPartialUpdateResponse,
  PostSegmentCreateResponse,
} from "klaviyo-api";

export const createSegmentExamplePayload: { data: PostSegmentCreateResponse } =
  {
    data: {
      data: {
        type: "segment",
        id: "string",
        attributes: {
          name: "Repeat Purchasers",
          definition: {
            conditionGroups: [
              {
                conditions: [
                  {
                    type: "profile-group-membership",
                    groupIds: ["string"],
                    timeframeFilter: {
                      type: "date",
                      operator: "after",
                      date: new Date("2022-11-08T00:00:00+00:00"),
                    },
                    isMember: true,
                  },
                  {
                    type: "profile-metric",
                    metricId: "string",
                    measurement: "count",
                    measurementFilter: {
                      type: "numeric",
                      operator: "equals",
                      value: 0,
                    },
                    timeframeFilter: {
                      type: "date",
                      operator: "after",
                      date: new Date("2022-11-08T00:00:00+00:00"),
                    },
                    metricFilters: [
                      {
                        property: "string",
                        filter: {
                          type: "string",
                          operator: "equals",
                          value: "string",
                        },
                      },
                    ],
                  },
                  {
                    type: "profile-marketing-consent",
                    consent: {
                      channel: "email",
                      consentStatus: {
                        subscription: "any",
                      },
                      canReceiveMarketing: true,
                    },
                  },
                  {
                    type: "profile-postal-code-distance",
                    countryCode: "string",
                    postalCode: "string",
                    unit: "kilometers",
                    filter: {
                      type: "numeric",
                      operator: "greater-than",
                      value: 0,
                    },
                  },
                  {
                    type: "profile-property",
                    property: "string",
                    filter: {
                      type: "string",
                      operator: "contains",
                      value: "string",
                    },
                  },
                  {
                    type: "profile-region",
                    inRegion: true,
                    region: "european_union",
                  },
                  {
                    type: "profile-predictive-analytics",
                    dimension: "average_days_between_orders",
                    filter: {
                      type: "numeric",
                      operator: "equals",
                      value: 0,
                    },
                  },
                  {
                    type: "profile-predictive-analytics",
                    dimension: "predicted_gender",
                    filter: {
                      type: "string",
                      operator: "equals",
                      value: "likely_female",
                    },
                  },
                ],
              },
            ],
          },
          created: new Date("2022-11-08T00:00:00+00:00"),
          updated: new Date("2022-11-08T00:00:00+00:00"),
          isActive: true,
          isProcessing: true,
          isStarred: true,
        },
        relationships: {
          profiles: {
            data: [
              {
                type: "profile",
                id: "string",
              },
            ],
            links: {
              self: "string",
              related: "string",
            },
          },
          tags: {
            data: [
              {
                type: "tag",
                id: "string",
              },
            ],
            links: {
              self: "string",
              related: "string",
            },
          },
        },
        links: {
          self: "string",
        },
      },
    },
  };

export const deleteSegmentExamplePayload: { data: string } = {
  data: "Segment deleted successfully.",
};

export const getSegmentExamplePayload: {
  data: GetSegmentRetrieveResponseCompoundDocument;
} = {
  data: {
    data: {
      type: "segment",
      id: "string",
      attributes: {
        name: "Repeat Purchasers",
        definition: {
          conditionGroups: [
            {
              conditions: [
                {
                  type: "profile-group-membership",
                  groupIds: ["string"],
                  timeframeFilter: {
                    type: "date",
                    operator: "after",
                    date: new Date("2022-11-08T00:00:00+00:00"),
                  },
                  isMember: true,
                },
                {
                  type: "profile-metric",
                  metricId: "string",
                  measurement: "count",
                  measurementFilter: {
                    type: "numeric",
                    operator: "equals",
                    value: 0,
                  },
                  timeframeFilter: {
                    type: "date",
                    operator: "after",
                    date: new Date("2022-11-08T00:00:00+00:00"),
                  },
                  metricFilters: [
                    {
                      property: "string",
                      filter: {
                        type: "string",
                        operator: "equals",
                        value: "string",
                      },
                    },
                  ],
                },
                {
                  type: "profile-marketing-consent",
                  consent: {
                    channel: "email",
                    consentStatus: {
                      subscription: "any",
                    },
                    canReceiveMarketing: true,
                  },
                },
                {
                  type: "profile-postal-code-distance",
                  countryCode: "string",
                  postalCode: "string",
                  unit: "kilometers",
                  filter: {
                    type: "numeric",
                    operator: "greater-than",
                    value: 0,
                  },
                },
                {
                  type: "profile-property",
                  property: "string",
                  filter: {
                    type: "string",
                    operator: "contains",
                    value: "string",
                  },
                },
                {
                  type: "profile-region",
                  inRegion: true,
                  region: "european_union",
                },
                {
                  type: "profile-predictive-analytics",
                  dimension: "average_days_between_orders",
                  filter: {
                    type: "numeric",
                    operator: "equals",
                    value: 0,
                  },
                },
                {
                  type: "profile-predictive-analytics",
                  dimension: "predicted_gender",
                  filter: {
                    type: "string",
                    operator: "equals",
                    value: "likely_female",
                  },
                },
              ],
            },
          ],
        },
        created: new Date("2022-11-08T00:00:00+00:00"),
        updated: new Date("2022-11-08T00:00:00+00:00"),
        isActive: true,
        isProcessing: true,
        isStarred: true,
        profileCount: 0,
      },
      links: {
        self: "string",
      },
      relationships: {
        profiles: {
          links: {
            self: "string",
            related: "string",
          },
        },
        tags: {
          data: [
            {
              type: "tag",
              id: "abcd1234-ef56-gh78-ij90-abcdef123456",
            },
          ],
          links: {
            self: "string",
            related: "string",
          },
        },
      },
    },
    included: [
      {
        type: "tag",
        id: "abcd1234-ef56-gh78-ij90-abcdef123456",
        attributes: {
          name: "My Tag",
        },
        links: {
          self: "string",
        },
      },
    ],
  },
};

export const listSegmentsExamplePayload: {
  data: GetSegmentListResponseCollectionCompoundDocument;
} = {
  data: {
    data: [
      {
        type: "segment",
        id: "string",
        attributes: {
          name: "Repeat Purchasers",
          definition: {
            conditionGroups: [
              {
                conditions: [
                  {
                    type: "profile-group-membership",
                    groupIds: ["string"],
                    timeframeFilter: {
                      type: "date",
                      operator: "after",
                      date: new Date("2022-11-08T00:00:00+00:00"),
                    },
                    isMember: true,
                  },
                  {
                    type: "profile-metric",
                    metricId: "string",
                    measurement: "count",
                    measurementFilter: {
                      type: "numeric",
                      operator: "equals",
                      value: 0,
                    },
                    timeframeFilter: {
                      type: "date",
                      operator: "after",
                      date: new Date("2022-11-08T00:00:00+00:00"),
                    },
                    metricFilters: [
                      {
                        property: "string",
                        filter: {
                          type: "string",
                          operator: "equals",
                          value: "string",
                        },
                      },
                    ],
                  },
                  {
                    type: "profile-marketing-consent",
                    consent: {
                      channel: "email",
                      consentStatus: {
                        subscription: "any",
                      },
                      canReceiveMarketing: true,
                    },
                  },
                  {
                    type: "profile-postal-code-distance",
                    countryCode: "string",
                    postalCode: "string",
                    unit: "kilometers",
                    filter: {
                      type: "numeric",
                      operator: "greater-than",
                      value: 0,
                    },
                  },
                  {
                    type: "profile-property",
                    property: "string",
                    filter: {
                      type: "string",
                      operator: "contains",
                      value: "string",
                    },
                  },
                  {
                    type: "profile-region",
                    inRegion: true,
                    region: "european_union",
                  },
                  {
                    type: "profile-predictive-analytics",
                    dimension: "average_days_between_orders",
                    filter: {
                      type: "numeric",
                      operator: "equals",
                      value: 0,
                    },
                  },
                  {
                    type: "profile-predictive-analytics",
                    dimension: "predicted_gender",
                    filter: {
                      type: "string",
                      operator: "equals",
                      value: "likely_female",
                    },
                  },
                ],
              },
            ],
          },
          created: new Date("2022-11-08T00:00:00+00:00"),
          updated: new Date("2022-11-08T00:00:00+00:00"),
          isActive: true,
          isProcessing: true,
          isStarred: true,
        },
        links: {
          self: "string",
        },
        relationships: {
          profiles: {
            links: {
              self: "string",
              related: "string",
            },
          },
          tags: {
            data: [
              {
                type: "tag",
                id: "abcd1234-ef56-gh78-ij90-abcdef123456",
              },
            ],
            links: {
              self: "string",
              related: "string",
            },
          },
        },
      },
    ],
    links: {
      self: "string",
      prev: "string",
      next: "string",
    },
    included: [
      {
        type: "tag",
        id: "abcd1234-ef56-gh78-ij90-abcdef123456",
        attributes: {
          name: "My Tag",
        },
        links: {
          self: "string",
        },
      },
    ],
  },
};

export const updateSegmentExamplePayload: {
  data: PatchSegmentPartialUpdateResponse;
} = {
  data: {
    data: {
      type: "segment",
      id: "string",
      attributes: {
        name: "Repeat Purchasers",
        definition: {
          conditionGroups: [
            {
              conditions: [
                {
                  type: "profile-group-membership",
                  groupIds: ["string"],
                  timeframeFilter: {
                    type: "date",
                    operator: "after",
                    date: new Date("2022-11-08T00:00:00+00:00"),
                  },
                  isMember: true,
                },
                {
                  type: "profile-metric",
                  metricId: "string",
                  measurement: "count",
                  measurementFilter: {
                    type: "numeric",
                    operator: "equals",
                    value: 0,
                  },
                  timeframeFilter: {
                    type: "date",
                    operator: "after",
                    date: new Date("2022-11-08T00:00:00+00:00"),
                  },
                  metricFilters: [
                    {
                      property: "string",
                      filter: {
                        type: "string",
                        operator: "equals",
                        value: "string",
                      },
                    },
                  ],
                },
                {
                  type: "profile-marketing-consent",
                  consent: {
                    channel: "email",
                    consentStatus: {
                      subscription: "any",
                    },
                    canReceiveMarketing: true,
                  },
                },
                {
                  type: "profile-postal-code-distance",
                  countryCode: "string",
                  postalCode: "string",
                  unit: "kilometers",
                  filter: {
                    type: "numeric",
                    operator: "greater-than",
                    value: 0,
                  },
                },
                {
                  type: "profile-property",
                  property: "string",
                  filter: {
                    type: "string",
                    operator: "contains",
                    value: "string",
                  },
                },
                {
                  type: "profile-region",
                  inRegion: true,
                  region: "european_union",
                },
                {
                  type: "profile-predictive-analytics",
                  dimension: "average_days_between_orders",
                  filter: {
                    type: "numeric",
                    operator: "equals",
                    value: 0,
                  },
                },
                {
                  type: "profile-predictive-analytics",
                  dimension: "predicted_gender",
                  filter: {
                    type: "string",
                    operator: "equals",
                    value: "likely_female",
                  },
                },
              ],
            },
          ],
        },
        created: new Date("2022-11-08T00:00:00+00:00"),
        updated: new Date("2022-11-08T00:00:00+00:00"),
        isActive: true,
        isProcessing: true,
        isStarred: true,
      },
      relationships: {
        profiles: {
          data: [
            {
              type: "profile",
              id: "string",
            },
          ],
          links: {
            self: "string",
            related: "string",
          },
        },
        tags: {
          data: [
            {
              type: "tag",
              id: "string",
            },
          ],
          links: {
            self: "string",
            related: "string",
          },
        },
      },
      links: {
        self: "string",
      },
    },
  },
};

export const selectSegmentExamplePayload = {
  result: [{ label: "Example Segment", key: "WwKnkd" }],
};
