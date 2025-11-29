
export enum View {
  Landing = 'landing',
  Dashboard = 'dashboard',
  Editor = 'editor',
  Gallery = 'gallery',
  Templates = 'templates',
  Profile = 'profile',
  Preview = 'preview'
}

export interface Waypoint {
  id: string;
  title: string;
  description: string; // Short summary for the node view
  prompt: string;
  notes?: string;
  imageUrl: string;
  rating?: number;
  wordCount?: number;
  position?: { x: number; y: number }; // For constellation view
  tags?: string[];
  timestamp: number;
}

export interface Odyssey {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  lastUpdated: number;
  waypoints: Waypoint[];
  tags: string[];
  status: 'Draft' | 'Published';
  author: {
    name: string;
    handle: string;
    avatar: string;
  };
  stats: {
    likes: number;
    remixes: number;
    views: number;
  }
}

export type AppState = {
  odysseys: Odyssey[];
  activeOdysseyId: string | null;
  user: {
    name: string;
    handle: string;
    avatar: string;
  };
  theme: 'light' | 'dark';
};

export interface AppContextType extends AppState {
  navigate: (view: View) => void;
  currentView: View;
  setActiveOdyssey: (id: string) => void;
  createOdyssey: (template?: Partial<Odyssey>) => void;
  updateOdyssey: (id: string, data: Partial<Odyssey>) => void;
  addWaypoint: (odysseyId: string, parentWaypointId?: string) => void;
  updateWaypoint: (odysseyId: string, waypointId: string, data: Partial<Waypoint>) => void;
  deleteWaypoint: (odysseyId: string, waypointId: string) => void;
  refinePromptWithAI: (prompt: string) => Promise<string>;
  toggleTheme: () => void;
}
