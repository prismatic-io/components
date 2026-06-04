export const getTimeOffDetailsExamplePayload = {
  data: {
    data: [
      {
        position: {
          id: "^(?:(?:[0-9a-f]{32})|(?:[0-9]+\\$[0-9]+)|(\\S+=\\S+))$",
          descriptor: "string",
          href: "string",
        },
        comment:
          "Lorem ipsum dolor sit amet, cum choro singulis consectetuer ut, ubique iisque contentiones ex duo. Quo lorem etiam eu.",
        timeOffType: {
          descriptor:
            "Lorem ipsum dolor sit amet, cum choro singulis consectetuer ut, ubique iisque contentiones ex duo. Quo lorem etiam eu.",
          id: "string",
        },
        reason: {
          id: "^(?:(?:[0-9a-f]{32})|(?:[0-9]+\\$[0-9]+)|(\\S+=\\S+))$",
          descriptor: "string",
          href: "string",
        },
        quantity: "36624060",
        status: {
          id: "^(?:(?:[0-9a-f]{32})|(?:[0-9]+\\$[0-9]+)|(\\S+=\\S+))$",
          descriptor: "string",
          href: "string",
        },
        date: "2024-06-08T07:00:00.000Z",
        unit: {
          id: "^(?:(?:[0-9a-f]{32})|(?:[0-9]+\\$[0-9]+)|(\\S+=\\S+))$",
          descriptor: "string",
          href: "string",
        },
        worker: {
          id: "^(?:(?:[0-9a-f]{32})|(?:[0-9]+\\$[0-9]+)|(\\S+=\\S+))$",
          descriptor: "string",
          href: "string",
        },
      },
    ],
    total: 0,
  },
};

export const postTimeOffRequestExamplePayload = {
  data: {
    businessProcessParameters: {
      action: {
        id: "^(?:(?:[0-9a-f]{32})|(?:[0-9]+\\$[0-9]+)|(\\S+=\\S+))$",
        descriptor: "string",
        href: "string",
      },
      overallBusinessProcess: {
        id: "^(?:(?:[0-9a-f]{32})|(?:[0-9]+\\$[0-9]+)|(\\S+=\\S+))$",
        descriptor: "string",
        href: "string",
      },
      comment:
        "Lorem ipsum dolor sit amet, cum choro singulis consectetuer ut, ubique iisque contentiones ex duo. Quo lorem etiam eu.",
      comments: [
        {
          commentDate: "2024-06-08T07:00:00.000Z",
          comment:
            "Lorem ipsum dolor sit amet, cum choro singulis consectetuer ut, ubique iisque contentiones ex duo. Quo lorem etiam eu.",
          person: {
            id: "^(?:(?:[0-9a-f]{32})|(?:[0-9]+\\$[0-9]+)|(\\S+=\\S+))$",
            descriptor: "string",
            href: "string",
          },
        },
      ],
      transactionStatus: {
        id: "^(?:(?:[0-9a-f]{32})|(?:[0-9]+\\$[0-9]+)|(\\S+=\\S+))$",
        descriptor: "string",
        href: "string",
      },
      warningValidations:
        "Lorem ipsum dolor sit amet, cum choro singulis consectetuer ut, ubique iisque contentiones ex duo. Quo lorem etiam eu.",
      attachments: [
        {
          description:
            "Lorem ipsum dolor sit amet, cum choro singulis consectetuer ut, ubique iisque contentiones ex duo. Quo lorem etiam eu.",
          contentType: {
            id: "^(?:(?:[0-9a-f]{32})|(?:[0-9]+\\$[0-9]+)|(\\S+=\\S+))$",
            descriptor: "string",
            href: "string",
          },
          fileLength: "208232717",
          uploadDate: "2024-06-08T07:00:00.000Z",
          fileName:
            "Lorem ipsum dolor sit amet, cum choro singulis consectetuer ut, ubique iisque contentiones ex duo. Quo lorem etiam eu.",
          uploadedBy: {
            id: "^(?:(?:[0-9a-f]{32})|(?:[0-9]+\\$[0-9]+)|(\\S+=\\S+))$",
            descriptor: "string",
            href: "string",
          },
          category: {
            id: "^(?:(?:[0-9a-f]{32})|(?:[0-9]+\\$[0-9]+)|(\\S+=\\S+))$",
            descriptor: "string",
            href: "string",
          },
          id: "string",
        },
      ],
      overallStatus:
        "Lorem ipsum dolor sit amet, cum choro singulis consectetuer ut, ubique iisque contentiones ex duo. Quo lorem etiam eu.",
      criticalValidations:
        "Lorem ipsum dolor sit amet, cum choro singulis consectetuer ut, ubique iisque contentiones ex duo. Quo lorem etiam eu.",
      for: {
        id: "^(?:(?:[0-9a-f]{32})|(?:[0-9]+\\$[0-9]+)|(\\S+=\\S+))$",
        descriptor: "string",
        href: "string",
      },
    },
    days: [
      {
        date: "2024-06-08T07:00:00.000Z",
        start: "2024-06-08T07:00:00.000Z",
        position: {
          id: "string",
          descriptor: "Lorem ipsum dolor sit ame",
        },
        end: "2024-06-08T07:00:00.000Z",
        reason: {
          id: "^(?:(?:[0-9a-f]{32})|(?:[0-9]+\\$[0-9]+)|(\\S+=\\S+))$",
          descriptor: "string",
          href: "string",
        },
        dailyQuantity: "30",
        comment:
          "Lorem ipsum dolor sit amet, cum choro singulis consectetuer ut, ubique iisque contentiones ex duo. Quo lorem etiam eu.",
        timeOffType: {
          id: "string",
          descriptor: "Lorem ipsum dolor sit ame",
        },
        id: "string",
        descriptor: "Lorem ipsum dolor sit ame",
      },
    ],
  },
};

export const getTimeOffBalanceByIdExamplePayload = {
  data: {
    unit: {
      id: "^(?:(?:[0-9a-f]{32})|(?:[0-9]+\\$[0-9]+)|(\\S+=\\S+))$",
      descriptor: "string",
      href: "string",
    },
    position: {
      id: "string",
      descriptor: "Lorem ipsum dolor sit ame",
    },
    quantity: "1542937255",
    absencePlan: {
      timeoffs:
        "Lorem ipsum dolor sit amet, cum choro singulis consectetuer ut, ubique iisque contentiones ex duo. Quo lorem etiam eu.",
      descriptor:
        "Lorem ipsum dolor sit amet, cum choro singulis consectetuer ut, ubique iisque contentiones ex duo. Quo lorem etiam eu.",
      absenceTable: [
        {
          id: "string",
          descriptor: "Lorem ipsum dolor sit ame",
        },
      ],
      id: "Lorem ipsum dolor sit amet, cum choro singulis consectetuer ut, ubique iisque contentiones ex duo. Quo lorem etiam eu.",
    },
    dateOfFirstAbsence: "2024-06-08T07:00:00.000Z",
    effectiveDate: "2024-06-08T07:00:00.000Z",
    category: {
      id: "^(?:(?:[0-9a-f]{32})|(?:[0-9]+\\$[0-9]+)|(\\S+=\\S+))$",
      descriptor: "string",
      href: "string",
    },
    worker: {
      id: "^(?:(?:[0-9a-f]{32})|(?:[0-9]+\\$[0-9]+)|(\\S+=\\S+))$",
      descriptor: "string",
      href: "string",
    },
  },
};
