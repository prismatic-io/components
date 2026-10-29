export const getAlgoliaUrl = (applicationID: string, goingToRead: boolean) => {
  const algoliaUrl = goingToRead
    ? `https://${applicationID}-dsn.algolia.net`
    : `https://${applicationID}.algolia.net`;

  return algoliaUrl;
};
