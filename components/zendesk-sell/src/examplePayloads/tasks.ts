






const taskData = {
  id: 16238471,
  creator_id: 1290481,
  owner_id: 1290481,
  resource_type: "deal",
  resource_id: 8150614,
  completed: false,
  completed_at: null,
  due_date: "2025-02-15T17:00:00Z",
  overdue: false,
  remind_at: "2025-02-15T09:00:00Z",
  content: "Send updated pricing proposal to Acme Corp",
  created_at: "2025-01-10T11:30:55Z",
  updated_at: "2025-01-10T11:30:55Z",
};


export const createTaskExamplePayload = {
  data: {
    data: taskData,
    meta: {
      type: "task",
    },
  },
};


export const getTaskExamplePayload = {
  data: {
    data: taskData,
    meta: {
      type: "task",
    },
  },
};


export const updateTaskExamplePayload = {
  data: {
    data: taskData,
    meta: {
      type: "task",
    },
  },
};


export const listTasksExamplePayload = {
  data: {
    items: [
      {
        data: taskData,
        meta: {
          type: "task",
        },
      },
    ],
    meta: {
      type: "collection",
      count: 1,
      links: {
        self: "https://api.getbase.com/v2/tasks?page=1&per_page=25",
        first_page: "https://api.getbase.com/v2/tasks?page=1&per_page=25",
        next_page: null,
      },
    },
  },
};


export const deleteTaskExamplePayload = {
  data: null,
};







export const getTasksStreamExamplePayload = {
  data: {
    items: [
      {
        data: {
          id: 16238471,
        },
        meta: {
          type: "task",
          sync: {
            event_type: "created",
            ack_key: "Task-16238471-1",
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
