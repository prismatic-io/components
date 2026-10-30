import type { Connection, Element } from "@prismatic-io/spectral";
import { createV3Client } from "../client";

export const getProjects = async (connection: Connection) => {
  const client = await createV3Client(connection);
  let nextPage = 0;
  let projects = [];
  let shouldFinish = true;
  do {
    const {
      data: { values, maxResults, startAt, isLast },
    } = await client.get<{
      values: {
        id: string;
        key: string;
        name: string;
      }[];
      maxResults: number;
      startAt: number;
      isLast: boolean;
    }>("/project/search", {
      params: {
        startAt: nextPage,
      },
    });
    projects = [...projects, ...values];
    nextPage = maxResults + startAt;
    shouldFinish = !isLast;
  } while (shouldFinish);

  return projects
    .map<Element>(({ id, key, name }) => ({
      label: `${key} - ${name}`,
      key: id,
    }))
    .sort((a, b) => (a.label < b.label ? -1 : 1));
};
