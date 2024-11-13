import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button } from '@mui/material';


export const TaskUpdateModal = ({ isModalOpen, updatedTitle, updatedDescription, setUpdatedDescription, setUpdatedTitle, handleTaskUpdate, setIsModalOpen}) =>{
    return (
    <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
    <DialogTitle>Update Task</DialogTitle>
    <DialogContent>
      <DialogContentText>Update the details of your task below.</DialogContentText>
      <TextField
        autoFocus
        margin="dense"
        label="Task Title"
        type="text"
        fullWidth
        variant="outlined"
        value={updatedTitle}
        onChange={(e) => setUpdatedTitle(e.target.value)}
      />
      <TextField
        margin="dense"
        label="Task Description"
        type="text"
        fullWidth
        multiline
        rows={4}
        variant="outlined"
        value={updatedDescription}
        onChange={(e) => setUpdatedDescription(e.target.value)}
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={() => setIsModalOpen(false)} color="secondary">
        Cancel
      </Button>
      <Button onClick={handleTaskUpdate} color="primary">
        Update Task
      </Button>
    </DialogActions>
  </Dialog>)
}