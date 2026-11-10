import { getTemplate } from "@/data/planner";
import type { Localized } from "@/data/types";
import type { PlannerTask } from "@/store/types";

export function taskTitle(task: PlannerTask, l: (v: Localized | undefined) => string) {
  return task.title ?? l(getTemplate(task.templateId)?.title);
}
