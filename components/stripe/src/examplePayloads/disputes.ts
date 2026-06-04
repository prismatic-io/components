





export const getDisputeExamplePayload = {
  data: {
    id: "dp_1MtJUT2eZvKYlo2CNaw2HvEv",
    object: "dispute",
    amount: 1000,
    balance_transactions: [],
    charge: "ch_3MmlLrLkdIwHu7ix0snN0B15",
    created: 1716397800,
    currency: "usd",
    evidence: {
      access_activity_log: null,
      billing_address: null,
      cancellation_policy: null,
      cancellation_policy_disclosure: null,
      cancellation_rebuttal: null,
      customer_communication: null,
      customer_email_address: null,
      customer_name: null,
      customer_purchase_ip: null,
      customer_signature: null,
      duplicate_charge_documentation: null,
      duplicate_charge_explanation: null,
      duplicate_charge_id: null,
      product_description: null,
      receipt: null,
      refund_policy: null,
      refund_policy_disclosure: null,
      refund_refusal_explanation: null,
      service_date: null,
      service_documentation: null,
      shipping_address: null,
      shipping_carrier: null,
      shipping_date: null,
      shipping_documentation: null,
      shipping_tracking_number: null,
      uncategorized_file: null,
      uncategorized_text: null,
    },
    evidence_details: {
      due_by: 1718000000,
      has_evidence: false,
      past_due: false,
      submission_count: 0,
    },
    is_charge_refundable: true,
    livemode: false,
    metadata: {},
    payment_intent: "pi_3MmlLrLkdIwHu7ix01zsk9pV",
    reason: "general",
    status: "warning_needs_response",
  } as unknown,
};




export const updateDisputeExamplePayload = getDisputeExamplePayload;








export const closeDisputeExamplePayload = {
  data: {
    ...(getDisputeExamplePayload.data as Record<string, unknown>),
    status: "lost",
  } as unknown,
};






export const listDisputesExamplePayload = {
  data: {
    object: "list",
    data: [getDisputeExamplePayload.data],
    has_more: false,
    url: "/v1/disputes",
  } as unknown,
};
