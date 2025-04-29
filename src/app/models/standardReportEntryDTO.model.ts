export interface StandardReportEntryDTO {
  id: number;
  implemented: boolean | null;
  action: string | null;
  responsableAction: string | null;
  deadline: string | null;
  successControl: string | null;
  isUpdated: boolean;
}