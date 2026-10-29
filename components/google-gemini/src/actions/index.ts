import chat from "./chat";
import files from "./files";
import generatedContent from "./generatedContent";
import models from "./models";

export default {
  ...chat,
  ...files,
  ...generatedContent,
  ...models,
};
