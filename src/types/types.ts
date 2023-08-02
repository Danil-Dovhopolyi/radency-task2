export interface NotesTableRowData extends IdentifiableRow {
  createdAt: Date;
  content: string;
  category: string;
  dates: string;
  activeNote: boolean;
  archived: boolean;
}

export interface SummaryTableRowData extends IdentifiableRow {
  noteCategory: string;
  active: number;
  archived: number;
}
export interface IdentifiableRow extends Object {
  id: number;
}
