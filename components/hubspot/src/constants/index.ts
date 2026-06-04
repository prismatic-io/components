export const EVENT_TYPES = [
  { label: "Contact Creation", value: "contact.creation" },
  { label: "Contact Deletion", value: "contact.deletion" },
  { label: "Contact Privacy Deletion", value: "contact.privacyDeletion" },
  { label: "Company Creation", value: "company.creation" },
  { label: "Company Deletion", value: "company.deletion" },
  { label: "Deal Creation", value: "deal.creation" },
  { label: "Deal Deletion", value: "deal.deletion" },
  { label: "Ticket Creation", value: "ticket.creation" },
  { label: "Ticket Deletion", value: "ticket.deletion" },
  { label: "Product Creation", value: "product.creation" },
  { label: "Product Deletion", value: "product.deletion" },
  { label: "Line Item Creation", value: "line_item.creation" },
  { label: "Line Item Deletion", value: "line_item.deletion" },
  { label: "Conversation Creation", value: "conversation.creation" },
  { label: "Conversation Deletion", value: "conversation.deletion" },
  { label: "Conversation New Message", value: "conversation.newMessage" },
  {
    label: "Conversation Privacy Deletion",
    value: "conversation.privacyDeletion",
  },
  { label: "Contact Merge", value: "contact.merge" },
  { label: "Company Merge", value: "company.merge" },
  { label: "Deal Merge", value: "deal.merge" },
  { label: "Ticket Merge", value: "ticket.merge" },
  { label: "Product Merge", value: "product.merge" },
  { label: "Line Item Merge", value: "line_item.merge" },
  { label: "Contact Restore", value: "contact.restore" },
  { label: "Company Restore", value: "company.restore" },
  { label: "Deal Restore", value: "deal.restore" },
  { label: "Ticket Restore", value: "ticket.restore" },
  { label: "Product Restore", value: "product.restore" },
  { label: "Line Item Restore", value: "line_item.restore" },
  { label: "Contact Association Change", value: "contact.associationChange" },
  { label: "Company Association Change", value: "company.associationChange" },
  { label: "Deal Association Change", value: "deal.associationChange" },
  { label: "Ticket Association Change", value: "ticket.associationChange" },
  {
    label: "Line Item Association Change",
    value: "line_item.associationChange",
  },
];

export const EVENT_TYPES_PROPERTY_CHANGE = [
  { label: "Contact Property Change", value: "contact.propertyChange" },
  { label: "Company Property Change", value: "company.propertyChange" },
  { label: "Deal Property Change", value: "deal.propertyChange" },
  { label: "Ticket Property Change", value: "ticket.propertyChange" },
  { label: "Product Property Change", value: "product.propertyChange" },
  { label: "Line Item Property Change", value: "line_item.propertyChange" },
  {
    label: "Conversation Property Change",
    value: "conversation.propertyChange",
  },
];

export const SUCCESS_MESSAGE = "All webhooks deleted successfully";

export const MAX_SEARCH_LIMIT = 200;
