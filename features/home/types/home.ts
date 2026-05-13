export type UserProfile = {
  name: string;
  level: string;
  completedWorkouts: number;
};

export type Workout = {
  id: number;
  professional: string;
  objective: string;
  condition: string;
  duration: string;
  location: string;
  crefito: string;
  published: string;
};

export type QuickAction = {
  id: string;
  label: string;
  route: string;
};

export type BottomNavigationItem = {
  id: string;
  label: string;
  icon: string;
  route: string;
  active?: boolean;
};
