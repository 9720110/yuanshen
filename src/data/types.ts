export interface Character {
  id: string;
  name: string;
  title: string;
  region: string;
  rarity: 4 | 5;
  element: ElementType;
  weaponType: string;
  role: string[];
  description: string;
  themeColor: string;
  themeGradient: string;
  stats: { label: string; value: number }[];
  talents: Talent[];
  constellations: Constellation[];
  materials: MaterialNeeded[];
  teams: Team[];
  voiceActor: string;
  birthDate: string;
  story: string;
}

export type ElementType = 'Pyro' | 'Hydro' | 'Anemo' | 'Electro' | 'Dendro' | 'Cryo' | 'Geo';

export interface Talent {
  id: string;
  name: string;
  icon: string;
  type: 'normal' | 'skill' | 'burst' | 'passive1' | 'passive2' | 'passive3';
  description: string;
  simpleDescription: string;
  detail: string;
  values: { level: number; value: string }[];
}

export interface Constellation {
  id: number;
  name: string;
  icon: string;
  effect: string;
  simpleEffect: string;
  unlocked: boolean;
}

export interface MaterialNeeded {
  name: string;
  icon: string;
  amount: number;
  category: 'boss' | 'local_specialty' | 'enemy_drop' | 'talent_book' | 'weekly_boss' | 'mora';
}

export interface Team {
  name: string;
  characters: string[];
  description: string;
  rotation: string;
}

export interface MapPin {
  id: string;
  name: string;
  type: 'oculus' | 'chest' | 'boss' | 'material' | 'domain' | 'waypoint' | 'puzzle';
  x: number;
  y: number;
  icon: string;
  region: string;
  description: string;
  collected?: boolean;
}

export interface Region {
  id: string;
  name: string;
  themeColor: string;
  title: string;
  description: string;
}
