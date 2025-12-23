// types/index.ts
export interface Theme {
  icon: string;
  label: string;
  description: string | null;
  subDescriptions: string[];
}

export interface Facility {
  label: string;
  paid: boolean;
  description: string | null;
}

export interface TitleInfo {
  icon: string;
  label: string;
  description: string | null;
  subDescriptions: string[] | null;
}

export interface FacilityCategory {
  title: TitleInfo;
  freeText: string;
  facilities: Facility[] | null;
}

export interface GeneralInfo {
  themes: Theme[];
  generalInfoText: string;
  facilities: Facility[];
}

export interface ImportantInfo {
  checkInTime: string;
  checkOutTime: string;
  desc: string;
}

export interface SeasonInfo {
  title: string;
  startDate?: string | null;
  endDate?: string | null;
  active: boolean;
  generalInfo: GeneralInfo;
  importantInfo: ImportantInfo;
  facilityCategories: FacilityCategory[];
}