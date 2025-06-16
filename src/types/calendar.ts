export type CalendarDay = {
  date: Date;
  isCurrentMonth: boolean;
  holiday?: PublicHoliday;
};

type HolidayType =
  | "Public"
  | "Bank"
  | "School"
  | "Authorities"
  | "Optional"
  | "Observance";

export type PublicHoliday = {
  date: string;
  localName: string;
  name: string;
  countryCode: string;
  global: true;
  counties: string[];
  launchYear: number;
  types: HolidayType[];
};
