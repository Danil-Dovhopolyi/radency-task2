import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomTable from '../../components/CustomTable';
import {
  deleteNote,
  addSummaryData,
  archiveToAchieve,
} from '../../store/actions';
import { AppState } from '../../store/reducer';

function NotesPage() {
  const dispatch = useDispatch();
  const notes = useSelector((state: AppState) => state.notes);
  const summaryData = useSelector((state: AppState) => state.summaryData);

  useEffect(() => {
    dispatch(addSummaryData());
  }, [dispatch, notes]);

  const handleDelete = (id: number) => {
    dispatch(deleteNote(id));
  };

  const handleEdit = (id: number) => {
    console.log(`Edit note with ID: ${id}`);
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
    </div>
  );
}

export default NotesPage;
