import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { Milestone } from '../../types';

interface DateEditDialogProps {
  open: boolean;
  onClose: () => void;
  milestone: Milestone | null;
  onSave: (milestone: Milestone) => void;
}

const DateEditDialog: React.FC<DateEditDialogProps> = ({ open, onClose, milestone, onSave }) => {
  const [editedDate, setEditedDate] = useState('');

  useEffect(() => {
    if (milestone) {
      setEditedDate(milestone.date.toISOString().split('T')[0]);
    }
  }, [milestone]);

  const handleSave = () => {
    if (milestone) {
      onSave({
        ...milestone,
        date: new Date(editedDate)
      });
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Date</DialogTitle>
      <DialogContent>
        <TextField
          label="Date"
          type="date"
          value={editedDate}
          onChange={(e) => setEditedDate(e.target.value)}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DateEditDialog;