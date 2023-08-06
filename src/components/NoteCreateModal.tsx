import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
} from '@mui/material';
import { NotesTableRowData } from '../types/types';

interface CreateNoteModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (note: NotesTableRowData) => void;
}

const categories = ['Task', 'Random Thought', 'Idea'];

function CreateNoteModal({ open, onClose, onSave }: CreateNoteModalProps) {
  const [content, setContent] = useState('');
  const [category, setCategory] = useState(categories[0]);

  const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(event.target.value);
  };

  const handleSave = () => {
    const dateRegex = /\b\d{1,2}\/\d{1,2}\/\d{4}\b/g;
    const datesInContent = content.match(dateRegex);

    const dates = datesInContent ? datesInContent.join(', ') : '';

    const newNote: NotesTableRowData = {
      createdAt: new Date(),
      id: Date.now(),
      content,
      category,
      activeNote: true,
      archived: false,
      dates,
    };

    onSave(newNote);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create New Note</DialogTitle>
      <DialogContent sx={{ overflowY: 'initial' }}>
        <TextField
          label="Content"
          fullWidth
          value={content}
          onChange={handleContentChange}
          sx={{ margin: '1%' }}
        />
        <TextField
          select
          label="Category"
          fullWidth
          value={category}
          onChange={handleCategoryChange}
          sx={{ margin: '1%' }}
        >
          {categories.map((categor) => (
            <MenuItem key={categor} value={categor}>
              {categor}
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateNoteModal;
