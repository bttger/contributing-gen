import { z } from "zod";

export const root_package_json_schema = z.object({
  name: z.string(),
  version: z.string().regex(/\d\.\d\.\d/),
  workspaces: z.optional(z.array(z.string()))
});

export const workspace_package_json_schema = z.object({
  name: z.string(),
  slug: z.string(),
  version: z.string().regex(/\d\.\d\.\d/)
});
