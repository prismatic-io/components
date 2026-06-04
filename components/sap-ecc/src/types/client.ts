import type { ActionContext, DataSourceContext } from "@prismatic-io/spectral";

export type ClientContext = Pick<ActionContext, "logger"> | DataSourceContext;
