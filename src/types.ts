export interface ReleaseData {
  releaseName: string;
  team: string;
  startDate: Date;
  endDate: Date;
  description: string;
  features: string[];
  milestones: Milestone[];
  categories: Category[];
  progress: number;
  bugs: {
    totalUnresolved: number;
    resolved: number;
    inProgress: number;
    toDo: number;
  };
  development: {
    completed: number;
    inProgress: number;
    notStarted: number;
    blocked: number;
  };
  tasks: Record<string, TaskData>;
  teamMembers: Record<string, string[]>;
}

export interface Milestone {
  id: number;
  name: string;
  date: Date;
}

export interface Category {
  name: string;
  progress: number;
  tasksCompleted: number;
  totalTasks: number;
}

export interface TaskData {
  total: number;
  completed: number;
  startDate: string;
  endDate: string;
  workingDays: number;
}

export interface Team {
  id: number;
  name: string;
  members: { id: number; name: string; role: string }[];
}

export interface Feature {
  name: string;
  progress: number;
}