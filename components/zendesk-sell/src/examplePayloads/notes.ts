






const noteData = {
  id: 29475810,
  creator_id: 1290481,
  resource_type: "contact",
  resource_id: 47912050,
  content:
    "Had a productive call with Mark regarding the Q1 renewal. He confirmed budget approval and expects to sign by end of March.",
  is_important: true,
  tags: ["follow-up", "renewal"],
  type: "regular",
  created_at: "2025-01-10T10:15:22Z",
  updated_at: "2025-01-10T10:15:22Z",
};


export const createNoteExamplePayload = {
  data: {
    data: noteData,
    meta: {
      type: "note",
    },
  },
};


export const getNoteExamplePayload = {
  data: {
    data: noteData,
    meta: {
      type: "note",
    },
  },
};


export const updateNoteExamplePayload = {
  data: {
    data: noteData,
    meta: {
      type: "note",
    },
  },
};


export const listNotesExamplePayload = {
  data: {
    items: [
      {
        data: noteData,
        meta: {
          type: "note",
        },
      },
    ],
    meta: {
      type: "collection",
      count: 1,
      links: {
        self: "https://api.getbase.com/v2/notes?page=1&per_page=25",
        first_page: "https://api.getbase.com/v2/notes?page=1&per_page=25",
        next_page: null,
      },
    },
  },
};


export const deleteNoteExamplePayload = {
  data: null,
};







export const getNotesStreamExamplePayload = {
  data: {
    items: [
      {
        data: {
          id: 29475810,
        },
        meta: {
          type: "note",
          sync: {
            event_type: "created",
            ack_key: "Note-29475810-1",
            revision: 1,
          },
        },
      },
    ],
    meta: {
      type: "collection",
      count: 1,
      links: {},
    },
  },
};
