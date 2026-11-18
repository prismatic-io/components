export const createChangeOrderExamplePayload = {
  data: {
    createChangeOrder: {
      id: "abcdef1234567890abcdef12",
      con: {
        displayValue: "ECO-12345",
      },
      description: "Initial creation of the change order for testing purposes.",
      name: "Initial Change Order",
      status: "DRAFT",
      type: "ECO",
      created: "2024-06-24T22:31:27.808Z",
      creator: {
        email: "john.doe@example.com",
        id: "1234567890abcdef12345678",
        firstName: "John",
        lastName: "Doe",
      },
    },
  },
};

export const listChangeOrdersExamplePayload = {
  data: {
    changeOrders: {
      connection: {
        edges: [
          {
            node: {
              con: {
                id: "abcdef1234567890abcdef12",
                displayValue: "ECO-12345",
              },
              id: "abcdef1234567890abcdef34",
              name: "PCB Revision for Rev B Release",
              type: "ECO",
              description:
                "Engineering change order to update PCB layout for Rev B manufacturing release.",
              documentLinks: [
                {
                  document: {
                    id: "abcdef1234567890abcdef45",
                    size: 482133,
                    src: "https://example.com/documents/pcb_rev_b_redline.pdf",
                    name: "pcb_rev_b_redline.pdf",
                    url: "https://example.com/documents/pcb_rev_b_redline.pdf",
                    status: "COMPLETED",
                    created: "2024-06-24T22:31:27.808Z",
                  },
                },
              ],
              status: "DRAFT",
              resolution: "NONE",
              erpOptions: null,
              created: "2024-06-24T22:31:27.808Z",
              creator: {
                email: "john.doe@example.com",
                id: "1234567890abcdef12345678",
                firstName: "John",
                lastName: "Doe",
              },
              approvalType: "FIRST_IN",
              lastModified: "2024-06-24T22:31:27.808Z",
            },
          },
        ],
      },
    },
  },
};
