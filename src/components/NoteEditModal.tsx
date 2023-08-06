import React, { useState, useEffect } from 'react';
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

interface NoteEditModalProps {
  open: boolean;
  onClose: () => void;
  note: NotesTableRowData;
  onSave: (updatedNote: NotesTableRowData) => void;
}

const categories = ['Task', 'Random Thought', 'Idea'];

function NoteEditModal({ open, onClose, note, onSave }: NoteEditModalProps) {
  // Initialize the local state using the note prop
  const [editingContent, setEditingContent] = useState(note.content);
  const [editingCategory, setEditingCategory] = useState(note.category);

  useEffect(() => {
    setEditingContent(note.content);
    setEditingCategory(note.category);
  }, [note, open]);

  const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditingContent(event.target.value);
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditingCategory(event.target.value);
  };

  const handleSave = () => {
    const updatedNote: NotesTableRowData = {
      ...note,
      content: editingContent,
      category: editingCategory,
    };

    onSave(updatedNote);
    onClose();
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Content and Category</DialogTitle>
      <DialogContent sx={{ overflowY: 'initial' }}>
        <TextField
          label="Content"
          fullWidth
          value={editingContent}
          onChange={handleContentChange}
          sx={{ margin: '1%' }}
        />
        <TextField
          select
          label="Category"
          fullWidth
          value={editingCategory}
          onChange={handleCategoryChange}
          sx={{ margin: '1%' }}
        >
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
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

export default NoteEditModal;
