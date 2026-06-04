import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";







export const getCustomerTimezone = async (
  client: HttpClient,
  customerId: string,
): Promise<string> => {
  const response = await client.post(
    `/customers/${customerId}/googleAds:search`,
    {
      query: "SELECT customer.time_zone FROM customer LIMIT 1",
    },
  );

  const timeZone = response.data?.results?.[0]?.customer?.timeZone;

  if (!timeZone) {
    throw new Error(`Unable to retrieve timezone for customer ${customerId}`);
  }

  return timeZone;
};






export const getCurrentDate = (timeZone: string): string => {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return formatter.format(new Date()); 
};






export const getPreviousDate = (timeZone: string): string => {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const date = new Date();
  date.setDate(date.getDate() - 1);
  return formatter.format(date); 
};









export const getGAQLDateTime = (
  timeZone: string,
  hoursAgo?: number,
): string => {
  const date = new Date();

  if (typeof hoursAgo === "number" && hoursAgo > 0) {
    date.setHours(date.getHours() - hoursAgo);
  }

  
  const dateFormatter = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const timeFormatter = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const datePart = dateFormatter.format(date); 
  const timePart = timeFormatter.format(date); 

  return `${datePart} ${timePart}`;
};
