import selectAttachment from "./selectAttachment";
import selectCustomField from "./selectCustomField";
import selectPortfolio from "./selectPortfolio";
import selectProject from "./selectProject";
import selectSection from "./selectSection";
import selectTag from "./selectTag";
import selectTask from "./selectTask";
import selectTeam from "./selectTeam";
import selectUser from "./selectUser";
import selectWorkspace from "./selectWorkspace";
export default {
  ...selectAttachment,
  ...selectCustomField,
  ...selectPortfolio,
  ...selectProject,
  ...selectSection,
  ...selectTag,
  ...selectTask,
  ...selectTeam,
  ...selectUser,
  ...selectWorkspace,
};
