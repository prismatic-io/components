const closeConnection = async (client) => {
  await client.quit();
};

export default closeConnection;
