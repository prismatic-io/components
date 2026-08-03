export const createAdResponse = {
  data: {
    id: "23849551358310668",
  },
};
export const getAdResponse = {
  data: {
    name: "Example Ad",
    adset_id: "23849551358310668",
    campaign_id: "23849551358310668",
    status: "ACTIVE",
    effective_status: "ACTIVE",
    id: "23849551358310668",
  },
};
export const deleteAdResponse = {
  data: {
    success: true,
  },
};
export const updateAdResponse = {
  data: {
    success: true,
  },
};
export const getAdPreviewResponse = {
  data: {
    data: [
      {
        body: "<div>Ad preview HTML content</div>",
      },
    ],
  },
};
export const listAdsInAccountResponse = {
  data: {
    data: [
      {
        name: "Example Ad",
        status: "ACTIVE",
        id: "23849551358310668",
      },
    ],
    paging: {
      cursors: {
        before: "ABCDEFG1234567890XYZ",
        after: "ABCDEFG1234567890XYZ",
      },
    },
  },
};
export const listAdsInAdsetResponse = {
  data: {
    data: [
      {
        name: "Example Ad in Adset",
        status: "ACTIVE",
        id: "23849551358310668",
      },
    ],
  },
};
export const listAdLeadsResponse = {
  data: {
    data: [
      {
        name: "Example Lead",
        id: "123456789012345",
      },
    ],
    paging: {
      cursors: {
        before: "ABCDEFG1234567890XYZ",
        after: "ABCDEFG1234567890XYZ",
      },
    },
  },
};
