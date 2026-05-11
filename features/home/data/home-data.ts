import type {
  BottomNavigationItem,
  QuickAction,
  UserProfile,
  Workout,
} from "../types/home";

export const userProfile: UserProfile = {
  name: "Julia",
  level: "Intermediário",
  completedWorkouts: 50,
};

export const quickActions: QuickAction[] = [
  {
    id: "schedule",
    label: "Agendar consulta online",
  },
  {
    id: "search-professionals",
    label: "Procurar fisioterapeutas",
  },
  {
    id: "instant-appointment",
    label: "Realizar consulta agora",
  },
];

export const fallbackWorkouts: Workout[] = [
  {
    id: 1,
    professional: "Roberta",
    objective: "hipertrofia",
    condition: "Dor na lombar",
    duration: "1h",
    location: "Academia",
    crefito: "CREFITO-5\n123456-F",
    published: "Publicado há 2 dias",
  },
  {
    id: 2,
    professional: "Juliana",
    objective: "Mobilidade",
    condition: "Mobilidade reduzida",
    duration: "30min",
    location: "Casa",
    crefito: "CREFITO-5\n123056-F",
    published: "Publicado há 2 dias",
  },
  {
    id: 3,
    professional: "João",
    objective: "hipertrofia",
    condition: "Dor na lombar",
    duration: "1h",
    location: "Academia",
    crefito: "CREFITO-5\n123456-F",
    published: "Publicado há 3 dias",
  },
  {
    id: 4,
    professional: "Roberta",
    objective: "Alongamento",
    condition: "Baixa mobilidade",
    duration: "20min",
    location: "Casa",
    crefito: "CREFITO-5\n123456-F",
    published: "Publicado há 4 dias",
  },
];

export const bottomNavigationItems: BottomNavigationItem[] = [
  {
    id: "home",
    label: "Home",
    icon: "⌂",
    active: true,
  },
  {
    id: "physiotherapists",
    label: "Fisioterapeutas",
    icon: "⌕",
  },
  {
    id: "progress",
    label: "Progresso",
    icon: "⌁",
  },
  {
    id: "profile",
    label: "Perfil",
    icon: "◉",
  },
];
