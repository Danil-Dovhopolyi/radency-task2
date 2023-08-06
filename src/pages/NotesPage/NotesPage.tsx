import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import CustomTable from '../../components/CustomTable';
import { NotesTableRowData } from '../../types/types';
import NoteEditModal from '../../components/NoteEditModal';
import {
  deleteNote,
  addSummaryData,
  archiveToAchieve,
  editNote,
  addNote,
} from '../../store/actions';
import { AppState } from '../../store/reducer';
import CreateNoteModal from '../../components/NoteCreateModal';

function NotesPage() {
  const dispatch = useDispatch();
  const notes = useSelector((state: AppState) => state.notes);
  const summaryData = useSelector((state: AppState) => state.summaryData);
  const archivedNotes = useSelector((state: AppState) => state.archivedNotes);
  const [editingNote, setEditingNote] = useState<NotesTableRowData | null>(
    null
  );
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);

  const handleCreateModalOpen = () => {
    setCreateModalOpen(true);
  };

  const handleCreateModalClose = () => {
    setCreateModalOpen(false);
  };

  const handleCreateNote = (newNote: NotesTableRowData) => {
    dispatch(addNote(newNote));
  };
  useEffect(() => {
    dispatch(addSummaryData());
  }, [dispatch, notes]);

  const handleDelete = (id: number) => {
    dispatch(deleteNote(id));
  };
  const [isArchivedVisible, setIsArchivedVisible] = useState(false);
  const handleToggleArchived = () => {
    setIsArchivedVisible((prevIsArchivedVisible) => !prevIsArchivedVisible);
  };

  const handleEdit = (id: number) => {
    const noteToEdit = notes.find((note) => note.id === id);

    if (noteToEdit) {
      setEditingNote(noteToEdit);
      setEditModalOpen(true);
    }
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };

  const handleSaveNote = (updatedNote: NotesTableRowData) => {
    dispatch(editNote(updatedNote));
  };

  const handleArchive = (id: number) => {
    dispatch(archiveToAchieve(id));
  };

  return (
    <div>
      <h2>Table for notes data:</h2>
      <CustomTable
        data={notes}
        columns={[
          { id: 'createdAt', label: 'Created' },
          { id: 'content', label: 'Content' },
          { id: 'category', label: 'Category' },
          { id: 'dates', label: 'Dates' },
        ]}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onArchive={handleArchive}
      />

      <h2>Table for Summary data:</h2>
      <CustomTable
        data={summaryData}
        columns={[
          { id: 'noteCategory', label: 'Note Category' },
          { id: 'active', label: 'Active' },
          { id: 'archived', label: 'Archived' },
        ]}
      />
      {editingNote && (
        <NoteEditModal
          open={isEditModalOpen}
          onClose={handleEditModalClose}
          note={editingNote}
          onSave={handleSaveNote}
        />
      )}
      <Button onClick={handleCreateModalOpen}>Create New Note</Button>

      <CreateNoteModal
        open={isCreateModalOpen}
        onClose={handleCreateModalClose}
        onSave={handleCreateNote}
      />
      <Button type="button" onClick={handleToggleArchived}>
        Toggle Archived Notes
      </Button>
      {isArchivedVisible && (
        <CustomTable
          data={archivedNotes}
          columns={[
            { id: 'createdAt', label: 'Created' },
            { id: 'content', label: 'Content' },
            { id: 'category', label: 'Category' },
            { id: 'dates', label: 'Dates' },
          ]}
        />
      )}
    </div>
  );
}

export default NotesPage;
