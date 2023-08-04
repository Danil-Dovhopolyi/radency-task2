/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/default-param-last */
import { v4 as uuidv4 } from 'uuid';
import { ActionTypes, Action } from './actions';
import { NotesTableRowData, SummaryTableRowData } from '../types/types';
import notes from '../mock/mockNotes';

// Define the predefined categories
const predefinedCategories = ['Task', 'Random Thought', 'Idea'];

export interface AppState {
  notes: NotesTableRowData[];
  summaryData: SummaryTableRowData[];
  archivedNotes: NotesTableRowData[];
}

const calculateSummaryData = (
  notesList: NotesTableRowData[],
  archivedNotesList: NotesTableRowData[]
): SummaryTableRowData[] => {
  const categories: { [key: string]: { active: number; archived: number } } =
    {};

  notesList.forEach((note) => {
    if (predefinedCategories.includes(note.category)) {
      if (!categories[note.category]) {
        categories[note.category] = { active: 0, archived: 0 };
      }

      categories[note.category].active += 1;
    }
  });

  archivedNotesList.forEach((note) => {
    if (predefinedCategories.includes(note.category)) {
      if (!categories[note.category]) {
        categories[note.category] = { active: 0, archived: 0 };
      }

      categories[note.category].archived += 1;
    }
  });

  const summaryData = predefinedCategories.map((category) => ({
    id: uuidv4(),
    noteCategory: category,
    active: categories[category]?.active || 0,
    archived: categories[category]?.archived || 0,
  }));

  return summaryData;
};

const defaultNotes = [...notes];

const initialState: AppState = {
  notes: defaultNotes.filter((note) => note.activeNote && !note.archived),
  summaryData: calculateSummaryData(
    defaultNotes.filter((note) => note.activeNote && !note.archived),
    defaultNotes.filter((note) => note.archived)
  ),
  archivedNotes: defaultNotes.filter((note) => note.archived === true),
};

const appReducer = (
  state: AppState = initialState,
  action: Action
): AppState => {
  switch (action.type) {
    case ActionTypes.ADD_NOTE:
      return {
        ...state,
        notes: [...state.notes, action.payload].filter(
          (note) => note.activeNote && !note.archived
        ),
        summaryData: calculateSummaryData(
          [...state.notes, action.payload].filter(
            (note) => note.activeNote && !note.archived
          ),
          state.archivedNotes
        ),
      };
    case ActionTypes.DELETE_NOTE:
      return {
        ...state,
        notes: state.notes
          .filter((note) => note.id !== action.id && !note.archived)
          .map((note) => ({ ...note, archived: false })),
        summaryData: calculateSummaryData(
          state.notes
            .filter((note) => note.id !== action.id && !note.archived)
            .map((note) => ({ ...note, archived: false })),
          state.archivedNotes
        ),
      };
    case ActionTypes.ARCHIVE_TO_ACHIEVE:
      const targetNote = state.notes.find((note) => note.id === action.id);

      if (!targetNote) {
        return state;
      }

      const updatedNote = { ...targetNote, archived: true, activeNote: false };

      return {
        ...state,
        notes: state.notes.filter((note) => note.id !== action.id),
        archivedNotes: [...state.archivedNotes, updatedNote],
        summaryData: calculateSummaryData(
          state.notes.filter((note) => note.id !== action.id && !note.archived),
          [...state.archivedNotes, updatedNote]
        ),
      };
    case ActionTypes.UNARCHIVE_TO_NOTES:
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.id
            ? { ...note, archived: false, activeNote: true }
            : note
        ),
        archivedNotes: state.archivedNotes.filter(
          (note) => note.id !== action.id
        ),
        summaryData: calculateSummaryData(
          state.notes.map((note) =>
            note.id === action.id ? { ...note, archived: false } : note
          ),
          state.archivedNotes.filter((note) => note.id !== action.id)
        ),
      };
    case ActionTypes.INIT_STORE:
      return {
        ...state,
        notes: defaultNotes.filter((note) => note.activeNote && !note.archived),
        summaryData: calculateSummaryData(
          defaultNotes.filter((note) => note.activeNote && !note.archived),
          defaultNotes.filter((note) => note.archived)
        ),
        archivedNotes: defaultNotes.filter((note) => note.archived),
      };
    case ActionTypes.SUMMARY_DATA:
      return {
        ...state,
        summaryData: calculateSummaryData(state.notes, state.archivedNotes),
      };
    default:
      return state;
  }
};

export default appReducer;
