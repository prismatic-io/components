













const commentObject = {
  id: "458",
  comment: [
    {
      text: "Great progress on the homepage design. Let's review the color palette in the next standup.",
    },
  ],
  comment_text: "Great progress on the homepage design. Let's review the color palette in the next standup.",
  user: {
    id: 81942673,
    username: "John Doe",
    email: "john.doe@example.com",
    color: "#7b68ee",
    initials: "JD",
    profilePicture: null,
  },
  resolved: false,
  assignee: null,
  assigned_by: null,
  reactions: [],
  date: "1704153600000",
};

export const getTaskCommentsExamplePayload = {
  data: {
    comments: [commentObject],
  },
};

export const createTaskCommentExamplePayload = {
  data: {
    id: 458,
    hist_id: "2b46a082-d55d-4a5e-957e-023af4f1d28e",
    date: 1704153600000,
  },
};

export const updateCommentExamplePayload = {
  data: null,
};

export const deleteCommentExamplePayload = {
  data: null,
};
