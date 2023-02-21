import {PrioritiesEnum} from "../../core/enums/priorities.enum";
import {ProjectItemInterface} from "../../project/interfaces/project-item.interface";
import {StatusesEnum} from "../../core/enums/statuses.enum";
import {ReminderItemInterface} from "./reminder-item.interface";
import {MarkItemInterface} from "../../mark/interface/mark-item.interface";

export interface TaskItemCreateUpdateInterface {
  id?: string
  name: string
  description: string
  deadline: Date | null
  priority: PrioritiesEnum
  projectId?: string
  reminderTime?: Date | null
  repeatReminder: boolean
  markIds: string[] | null
  status: string
}

export interface TaskItemInterface {
  id: string
  name: string
  description: string | null
  deadline: Date | null
  priority: PrioritiesEnum
  project: ProjectItemInterface | null
  reminder: ReminderItemInterface | null
  marks: MarkItemInterface[] | null
  status: StatusesEnum
}
