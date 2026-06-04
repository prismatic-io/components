export const createEnvelopeResponse = {
  envelope_id: "<envelopeId>",
};

export const createEmbeddedEnvelopeResponse = {
  envelope_id: "uuid",
  recipients: [
    {
      token: "uuid",
      email: "email1@email.com",
    },
  ],
};

export const getEnvelopeResponse = {
  envelope_id: "<envelopeId>",
  status: "ACTIVE",
  details: {
    recipients: [
      {
        id: "uuid",
        sign_status: "UNSIGNED",
        name: "name1",
        email: "email1@email.com",
        auth_type: "sign-auth",
        role: "Signee",
      },
    ],
  },
};

export const findEnvelopesResponse = {
  envelopes: [
    {
      envelope_id: "string",
      envelope: "string",
      status: "string",
      created_at: "string",
    },
  ],
};

export const listEnvelopesResponse = {
  findEnvelopesResponse,
  total: 123,
};

export const getEnvelopeStatusResponse = {
  status: "COMPLETED/ARCHIVED/ACTIVE/ERRORED",
};

export const sendReminderResponse = {
  recipient_id: "uuid",
};

export const genericMediaResponse = Buffer.from("media");

export const getIDVSessionResultResponse = {
  session_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  client_session_token_ttl: 599,
  user_tracking_id: "string",
  biometric_consent: "2022-12-01T15:23:28.894Z",
  state: "ONGOING",
  client_session_token: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  resources: {
    id_documents: [
      {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        source: {
          type: "END_USER",
        },
        document_type: "string",
        issuing_country: "string",
        pages: [
          {
            capture_method: "CAMERA",
            media: {
              id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              type: "IMAGE",
              created: "2021-06-11T11:39:24Z",
              last_updated: "2021-06-11T11:39:24Z",
            },
            frames: [
              {
                media: {
                  id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                  type: "IMAGE",
                  created: "2021-06-11T11:39:24Z",
                  last_updated: "2021-06-11T11:39:24Z",
                },
              },
            ],
          },
        ],
        document_fields: {
          media: {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            type: "IMAGE",
            created: "2021-06-11T11:39:24Z",
            last_updated: "2021-06-11T11:39:24Z",
          },
        },
        document_id_photo: {
          media: {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            type: "IMAGE",
            created: "2021-06-11T11:39:24Z",
            last_updated: "2021-06-11T11:39:24Z",
          },
        },
        tasks: [
          {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            state: "DONE",
            created: "2021-06-11T11:39:24Z",
            last_updated: "2021-06-11T11:39:24Z",
            generated_media: [
              {
                id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                type: "IMAGE",
              },
            ],
            generated_checks: [
              {
                id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                type: "ID_DOCUMENT_TEXT_DATA_CHECK",
              },
            ],
            type: "ID_DOCUMENT_TEXT_DATA_EXTRACTION",
          },
        ],
      },
    ],
    supplementary_documents: [
      {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        source: {
          type: "END_USER",
        },
        document_type: "string",
        issuing_country: "string",
        file: {
          media: {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            type: "IMAGE",
            created: "2021-06-11T11:39:24Z",
            last_updated: "2021-06-11T11:39:24Z",
          },
        },
        pages: [
          {
            capture_method: "CAMERA",
            media: {
              id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              type: "IMAGE",
              created: "2021-06-11T11:39:24Z",
              last_updated: "2021-06-11T11:39:24Z",
            },
            frames: [
              {
                media: {
                  id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                  type: "IMAGE",
                  created: "2021-06-11T11:39:24Z",
                  last_updated: "2021-06-11T11:39:24Z",
                },
              },
            ],
          },
        ],
        document_fields: {
          media: {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            type: "IMAGE",
            created: "2021-06-11T11:39:24Z",
            last_updated: "2021-06-11T11:39:24Z",
          },
        },
        tasks: [
          {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            state: "DONE",
            created: "2021-06-11T11:39:24Z",
            last_updated: "2021-06-11T11:39:24Z",
            generated_media: [
              {
                id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                type: "IMAGE",
              },
            ],
            generated_checks: [
              {
                id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                type: "ID_DOCUMENT_TEXT_DATA_CHECK",
              },
            ],
            type: "SUPPLEMENTARY_DOCUMENT_TEXT_DATA_EXTRACTION",
          },
        ],
      },
    ],
    liveness_capture: [
      {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        source: {
          type: "END_USER",
        },
        liveness_type: "ZOOM",
        facemap: {
          media: {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            type: "IMAGE",
            created: "2021-06-11T11:39:24Z",
            last_updated: "2021-06-11T11:39:24Z",
          },
        },
        frames: [
          {
            media: {
              id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              type: "IMAGE",
              created: "2021-06-11T11:39:24Z",
              last_updated: "2021-06-11T11:39:24Z",
            },
          },
        ],
        tasks: [],
      },
    ],
    face_capture: [
      {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        source: {
          type: "END_USER",
        },
        image: {
          media: {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            type: "IMAGE",
            created: "2021-06-11T11:39:24Z",
            last_updated: "2021-06-11T11:39:24Z",
          },
        },
        tasks: [],
      },
    ],
  },
  checks: [
    {
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      type: "ID_DOCUMENT_AUTHENTICITY",
      state: "CREATED",
      resources_used: ["3fa85f64-5717-4562-b3fc-2c963f66afa6"],
      generated_media: [
        {
          id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          type: "IMAGE",
        },
      ],
      report: {
        recommendation: {
          value: "APPROVE",
        },
        breakdown: [
          {
            sub_check: "string",
            result: "PASS",
            details: [],
          },
        ],
      },
      created: "2021-06-11T11:39:24Z",
      last_updated: "2021-06-11T11:39:24Z",
    },
  ],
};
