import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { flagErrorInScore } from "../api/api";
import { PLACEHOLDER_REMARK } from "../constants/values";

interface DialogBoxProps {
  workId: number;
  scoreTitle: string;
  scoreId: number;
  setOpen: (open: boolean) => void;
  isOpen: boolean;
}

const buttonStyles = {
  backgroundColor: '#0e58b3ff',
  color: 'white',
};

const DialogBox = ({ workId, scoreTitle, scoreId, setOpen, isOpen }: DialogBoxProps) => {
  const [remarks, setRemarks] = useState<string>("");
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);

  const onClose = () => {
    setOpen(false);
    setRemarks("");
  };

  const onSubmit = () => {
    flagErrorInScore(workId, scoreId, remarks);
    setOpen(false);
    setRemarks("");
    setSnackbarOpen(true);
  }

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={() => setOpen(false)}
        slotProps={{ paper: { sx: { width: '70vw' } } }}
      >
        <DialogTitle>Flag Error</DialogTitle>

        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Reporting error for: <b>{scoreTitle}</b>
          </Typography>

          <TextField
            fullWidth
            label={PLACEHOLDER_REMARK}
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={onSubmit} sx={buttonStyles}>Submit</Button>
        </DialogActions>

      </Dialog >

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        color="success"
        onClose={() => setSnackbarOpen(false)}
        message={"Error flagged. Thank you for your feedback!"}
      />
    </>
  );
};

export default DialogBox;