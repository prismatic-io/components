import { awsRegion, connectionInput, marker, maxItems, name } from "./common";

const crawlerName = { ...name, dataSource: "selectCrawler" };

export const listCrawlersInputs = {
  awsRegion,
  maxItems,
  marker,
  awsConnection: connectionInput,
};

export const startCrawlerInputs = {
  awsRegion,
  name: crawlerName,
  awsConnection: connectionInput,
};

export const stopCrawlerInputs = {
  awsRegion,
  name: crawlerName,
  awsConnection: connectionInput,
};
