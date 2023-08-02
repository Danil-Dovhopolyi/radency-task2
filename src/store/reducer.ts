/* eslint-disable @typescript-eslint/default-param-last */
import { ActionTypes, Action } from './actions';
import { NotesTableRowData, SummaryTableRowData } from '../types/types';
import notes from '../mock/mockNotes';

export interface AppState {
  notes: NotesTableRowData[];
  summaryData: SummaryTableRowData[];
}

const initialState: AppState = {
  notes: [],
  summaryData: [],
};

const calculateSummaryData = (
  noteList: NotesTableRowData[]
): SummaryTableRowData[] => {
  const categories: { [key: string]: { active: number; archived: number } } =
    {};

  noteList.forEach((note) => {
    if (!categories[note.category]) {
      categories[note.category] = { active: 0, archived: 0 };
    }

    if (note.archived) {
      categories[note.category].archived += 1;
    } else {
      categories[note.category].active += 1;
    }
  });

  return Object.keys(categories).map((category) => ({
    id: 1,
    noteCategory: category,
    active: categories[category].active,
    archived: categories[category].archived,
  }));
};
const appReducer = (
  state: AppState = initialState,
  action: Action
): AppState => {
  switch (action.type) {
    case ActionTypes.ADD_NOTE: {
      const updatedNotes = [...state.notes, action.payload];
      return {
        ...state,
        notes: updatedNotes.filter((note) => !note.archived),
        summaryData: calculateSummaryData(
          updatedNotes.filter((note) => !note.archived)
        ),
      };
    }
    case ActionTypes.DELETE_NOTE: {
      const updatedNotes = state.notes.filter((note) => note.id !== action.id);
      return {
        ...state,
        notes: updatedNotes.filter((note) => !note.archived),
        summaryData: calculateSummaryData(
          updatedNotes.filter((note) => !note.archived)
        ),
      };
    }
    case ActionTypes.INIT_STORE:
      return {
        ...state,
        notes: notes.filter((note) => !note.archived),
        summaryData: calculateSummaryData(
          notes.filter((note) => !note.archived)
        ),
      };
    case ActionTypes.ARCHIVE_NOTE: {
      const updatedNotes = state.notes.map((note) =>
        note.id === action.id
          ? { ...note, archived: true, activeNote: false }
          : note
      );
      return {
        ...state,
        notes: updatedNotes,
        summaryData: calculateSummaryData(updatedNotes),
      };
    }

    case ActionTypes.SUMMARY_DATA: {
      const calculatedSummaryData: SummaryTableRowData[] = calculateSummaryData(
        state.notes
      );
      return {
        ...state,
        summaryData: calculatedSummaryData,
      };
    }
    default:
      return state;
  }
};

export default appReducer;
