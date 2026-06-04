










export const listPaymentsExamplePayload = {
  data: {
    payments: [
      {
        id: "KkAkhdMsgzn59SM8A89WgKwekxLZY",
        created_at: "2023-05-01T21:23:59.255Z",
        updated_at: "2023-05-01T21:23:59.446Z",
        amount_money: {
          amount: 200,
          currency: "USD",
        },
        status: "COMPLETED",
        source_type: "CARD",
        card_details: {
          status: "CAPTURED",
          card: {
            card_brand: "VISA",
            last_4: "1111",
            exp_month: 11,
            exp_year: 2023,
            fingerprint: "sq-1-Tvruf3vPQxlvI6n0IyWZ4YgqXMiL...",
            card_type: "CREDIT",
            prepaid_type: "NOT_PREPAID",
            bin: "411111",
          },
          entry_method: "KEYED",
          cvv_status: "CVV_ACCEPTED",
          avs_status: "AVS_ACCEPTED",
          statement_description: "SQ *DEFAULT TEST ACCOUNT",
          card_payment_timeline: {
            authorized_at: "2023-05-01T21:23:59.255Z",
            captured_at: "2023-05-01T21:23:59.446Z",
          },
        },
        location_id: "L88917AVBK2S5",
        order_id: "CAISENgvhpdP05f1DWG9H8yMn4kZY",
        risk_evaluation: {
          created_at: "2023-05-01T21:23:59.255Z",
          risk_level: "NORMAL",
        },
        processing_fee: [
          {
            effective_at: "2023-05-03T21:23:59.255Z",
            type: "INITIAL",
            amount_money: {
              amount: 59,
              currency: "USD",
            },
          },
        ],
        total_money: {
          amount: 200,
          currency: "USD",
        },
        approved_money: {
          amount: 200,
          currency: "USD",
        },
        receipt_number: "KkAk",
        receipt_url: "https://squareup.com/receipt/preview/KkAkhdMsgzn59SM8A89WgKwekxLZY",
        delay_action: "CANCEL",
        delayed_until: "2023-05-08T21:23:59.255Z",
        version_token: "zpCBiO0YgSg5cCEqjUxHQGEuZA9SJBdp1WwI",
      },
    ],
    cursor: "5Ckfj4JXW8dJxBSXVYEIWkOcW9h8PBDyQf...",
  },
};






export const getPaymentExamplePayload = {
  data: {
    payment: {
      id: "KkAkhdMsgzn59SM8A89WgKwekxLZY",
      created_at: "2023-05-01T21:23:59.255Z",
      updated_at: "2023-05-01T21:23:59.446Z",
      amount_money: {
        amount: 200,
        currency: "USD",
      },
      status: "COMPLETED",
      source_type: "CARD",
      card_details: {
        status: "CAPTURED",
        card: {
          card_brand: "VISA",
          last_4: "1111",
          exp_month: 11,
          exp_year: 2023,
          fingerprint: "sq-1-Tvruf3vPQxlvI6n0IyWZ4YgqXMiL...",
          card_type: "CREDIT",
          prepaid_type: "NOT_PREPAID",
          bin: "411111",
        },
        entry_method: "KEYED",
        cvv_status: "CVV_ACCEPTED",
        avs_status: "AVS_ACCEPTED",
        statement_description: "SQ *DEFAULT TEST ACCOUNT",
        card_payment_timeline: {
          authorized_at: "2023-05-01T21:23:59.255Z",
          captured_at: "2023-05-01T21:23:59.446Z",
        },
      },
      location_id: "L88917AVBK2S5",
      order_id: "CAISENgvhpdP05f1DWG9H8yMn4kZY",
      risk_evaluation: {
        created_at: "2023-05-01T21:23:59.255Z",
        risk_level: "NORMAL",
      },
      processing_fee: [
        {
          effective_at: "2023-05-03T21:23:59.255Z",
          type: "INITIAL",
          amount_money: {
            amount: 59,
            currency: "USD",
          },
        },
      ],
      total_money: {
        amount: 200,
        currency: "USD",
      },
      approved_money: {
        amount: 200,
        currency: "USD",
      },
      receipt_number: "KkAk",
      receipt_url: "https://squareup.com/receipt/preview/KkAkhdMsgzn59SM8A89WgKwekxLZY",
      version_token: "zpCBiO0YgSg5cCEqjUxHQGEuZA9SJBdp1WwI",
    },
  },
};







export const createPaymentExamplePayload = getPaymentExamplePayload;






export const updatePaymentExamplePayload = {
  data: {
    payment: {
      id: "KkAkhdMsgzn59SM8A89WgKwekxLZY",
      created_at: "2023-05-01T21:23:59.255Z",
      updated_at: "2023-05-01T21:30:00.000Z",
      amount_money: {
        amount: 200,
        currency: "USD",
      },
      tip_money: {
        amount: 30,
        currency: "USD",
      },
      total_money: {
        amount: 230,
        currency: "USD",
      },
      approved_money: {
        amount: 230,
        currency: "USD",
      },
      status: "APPROVED",
      source_type: "CARD",
      version_token: "bTuGP0LVjY3ND1VUIFi4IvKWXLBqW3OjUf1v",
    },
  },
};






export const completePaymentExamplePayload = {
  data: {
    payment: {
      id: "KkAkhdMsgzn59SM8A89WgKwekxLZY",
      created_at: "2023-05-01T21:23:59.255Z",
      updated_at: "2023-05-01T21:24:30.000Z",
      amount_money: {
        amount: 200,
        currency: "USD",
      },
      status: "COMPLETED",
      source_type: "CARD",
      location_id: "L88917AVBK2S5",
      order_id: "CAISENgvhpdP05f1DWG9H8yMn4kZY",
      total_money: {
        amount: 200,
        currency: "USD",
      },
      approved_money: {
        amount: 200,
        currency: "USD",
      },
      version_token: "cTuGP0LVjY3ND1VUIFi4IvKWXLBqW3OjUf1w",
    },
  },
};






export const cancelPaymentExamplePayload = {
  data: {
    payment: {
      id: "KkAkhdMsgzn59SM8A89WgKwekxLZY",
      created_at: "2023-05-01T21:23:59.255Z",
      updated_at: "2023-05-01T21:25:00.000Z",
      amount_money: {
        amount: 200,
        currency: "USD",
      },
      status: "CANCELED",
      source_type: "CARD",
      location_id: "L88917AVBK2S5",
      order_id: "CAISENgvhpdP05f1DWG9H8yMn4kZY",
      version_token: "dTuGP0LVjY3ND1VUIFi4IvKWXLBqW3OjUf1x",
    },
  },
};






export const refundPaymentExamplePayload = {
  data: {
    refund: {
      id: "MgnD48yfyFb4sT0hMYqc0RCduDFZY",
      status: "PENDING",
      location_id: "L88917AVBK2S5",
      amount_money: {
        amount: 100,
        currency: "USD",
      },
      payment_id: "KkAkhdMsgzn59SM8A89WgKwekxLZY",
      order_id: "CAISENgvhpdP05f1DWG9H8yMn4kZY",
      created_at: "2023-05-02T10:15:30.000Z",
      updated_at: "2023-05-02T10:15:30.000Z",
      reason: "Customer requested refund",
    },
  },
};






export const getPaymentRefundExamplePayload = {
  data: {
    refund: {
      id: "MgnD48yfyFb4sT0hMYqc0RCduDFZY",
      status: "COMPLETED",
      location_id: "L88917AVBK2S5",
      amount_money: {
        amount: 100,
        currency: "USD",
      },
      payment_id: "KkAkhdMsgzn59SM8A89WgKwekxLZY",
      order_id: "CAISENgvhpdP05f1DWG9H8yMn4kZY",
      created_at: "2023-05-02T10:15:30.000Z",
      updated_at: "2023-05-02T10:16:00.000Z",
      reason: "Customer requested refund",
      processing_fee: [
        {
          effective_at: "2023-05-02T10:16:00.000Z",
          type: "INITIAL",
          amount_money: {
            amount: -29,
            currency: "USD",
          },
        },
      ],
    },
  },
};






export const listPaymentRefundsExamplePayload = {
  data: {
    refunds: [
      {
        id: "MgnD48yfyFb4sT0hMYqc0RCduDFZY",
        status: "COMPLETED",
        location_id: "L88917AVBK2S5",
        amount_money: {
          amount: 100,
          currency: "USD",
        },
        payment_id: "KkAkhdMsgzn59SM8A89WgKwekxLZY",
        created_at: "2023-05-02T10:15:30.000Z",
        updated_at: "2023-05-02T10:16:00.000Z",
      },
    ],
    cursor: "5Dkfj4JXW8dJxBSXVYEIWkOcW9h8PBDyQg...",
  },
};
