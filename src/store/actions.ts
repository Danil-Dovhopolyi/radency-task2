import { NotesTableRowData } from '../types/types';

export enum ActionTypes {
  ADD_NOTE = 'ADD_NOTE',
  DELETE_NOTE = 'DELETE_NOTE',
  INIT_STORE = 'INIT_STORE',
  SUMMARY_DATA = 'SUMMARY_DATA',
  ARCHIVE_TO_ACHIEVE = 'ARCHIVE_TO_ACHIEVE',
  UNARCHIVE_TO_NOTES = 'UNARCHIVE_TO_NOTES',
  EDIT_NOTE = 'EDIT_NOTE',
}

export interface AddNoteAction {
  type: ActionTypes.ADD_NOTE;
  payload: NotesTableRowData;
}
export interface EditNoteData {
  id: number;
  content: string;
  category: string;
}
export interface EditNoteAction {
  type: ActionTypes.EDIT_NOTE;
  payload: EditNoteData;
}
export interface ArchiveToAchieveAction {
  id: number;
  type: ActionTypes.ARCHIVE_TO_ACHIEVE;
}

export interface SummaryDataAction {
  type: ActionTypes.SUMMARY_DATA;
}

export interface InitStoreAction {
  type: ActionTypes.INIT_STORE;
  payload: NotesTableRowData[];
}

export interface DeleteNoteAction {
  type: ActionTypes.DELETE_NOTE;
  id: number;
}

export interface ArchivedNotesState {
  archivedNotes: NotesTableRowData[];
}
export type Action =
  | AddNoteAction
  | DeleteNoteAction
  | InitStoreAction
  | SummaryDataAction
  | ArchiveToAchieveAction
  | EditNoteAction;

export const addNote = (note: NotesTableRowData): AddNoteAction => ({
  type: ActionTypes.ADD_NOTE,
  payload: note,
});

export const deleteNote = (id: number): DeleteNoteAction => ({
  type: ActionTypes.DELETE_NOTE,
  id,
});

export const initStore = (payload?: NotesTableRowData[]): InitStoreAction => ({
  type: ActionTypes.INIT_STORE,
  payload: payload || [],
});

export const addSummaryData = (): SummaryDataAction => ({
  type: ActionTypes.SUMMARY_DATA,
});

export const archiveToAchieve = (id: number): ArchiveToAchieveAction => ({
  type: ActionTypes.ARCHIVE_TO_ACHIEVE,
  id,
});

export const editNote = (data: EditNoteData): EditNoteAction => ({
  type: ActionTypes.EDIT_NOTE,
  payload: data,
});
