import { NotesTableRowData } from '../types/types';

export enum ActionTypes {
  ADD_NOTE = 'ADD_NOTE',
  DELETE_NOTE = 'DELETE_NOTE',
  INIT_STORE = 'INIT_STORE',
  SUMMARY_DATA = 'SUMMARY_DATA',
  ARCHIVE_NOTE = 'ARCHIVE_NOTE',
}

export interface AddNoteAction {
  type: ActionTypes.ADD_NOTE;
  payload: NotesTableRowData;
}

export interface ArchiveNoteAction {
  type: ActionTypes.ARCHIVE_NOTE;
  id: number;
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

export type Action =
  | AddNoteAction
  | DeleteNoteAction
  | InitStoreAction
  | SummaryDataAction
  | ArchiveNoteAction;

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

export const archiveNote = (id: number): ArchiveNoteAction => ({
  type: ActionTypes.ARCHIVE_NOTE,
  id,
});
