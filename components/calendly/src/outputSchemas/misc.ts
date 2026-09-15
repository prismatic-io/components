export const createSingleUseSchedulingLinkOutputSchema = {
  type: "object",
  properties: {
    resource: {
      type: "object",
      properties: {
        booking_url: { type: "string" },
        owner: { type: "string" },
        owner_type: { type: "string" },
      },
      required: ["booking_url", "owner", "owner_type"],
    },
  },
  required: ["resource"],
};
export const createShareOutputSchema = {
  type: "object",
  properties: {
    resource: {
      type: "object",
      properties: {
        scheduling_links: {
          type: "array",
          items: {
            type: "object",
            properties: {
              booking_url: { type: "string" },
              owner: { type: "string" },
              owner_type: { type: "string" },
            },
          },
        },
        share_override: {
          type: ["object", "null"],
          properties: {
            name: { type: ["string", "null"] },
            duration: { type: ["number", "null"] },
            period_type: { type: ["string", "null"] },
            start_date: { type: ["string", "null"] },
            end_date: { type: ["string", "null"] },
            max_booking_time: { type: ["number", "null"] },
            hide_location: { type: ["boolean", "null"] },
            location_configurations: {
              type: ["array", "null"],
              items: {
                type: "object",
                properties: {
                  location: { type: ["string", "null"] },
                  additional_info: { type: ["string", "null"] },
                  phone_number: { type: ["string", "null"] },
                  position: { type: "number" },
                  kind: { type: "string" },
                },
              },
            },
            availability_rule: {
              type: ["object", "null"],
              properties: {
                rules: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      type: { type: "string" },
                      wday: { type: "string" },
                      date: { type: "string" },
                      intervals: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            from: { type: "string" },
                            to: { type: "string" },
                          },
                        },
                      },
                    },
                  },
                },
                timezone: { type: "string" },
              },
            },
          },
        },
      },
      required: ["scheduling_links"],
    },
  },
  required: ["resource"],
};
