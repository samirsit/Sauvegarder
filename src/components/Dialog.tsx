import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Paper, { PaperProps } from "@mui/material/Paper";
import Draggable from "react-draggable";
import { Box, TextField } from "@mui/material";
import { fetchAddStudents } from "../service/studentsService";
import { Students } from "../models/students";

function PaperComponent(props: PaperProps) {
  const nodeRef = React.useRef<HTMLDivElement>(null);
  return (
    <Draggable
      nodeRef={nodeRef as React.RefObject<HTMLDivElement>}
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} ref={nodeRef} />
    </Draggable>
  );
}

interface DraggableDialogProps {
  onAdd?: (student: Students) => void;
}

export default function DraggableDialog({ onAdd }: DraggableDialogProps) {
  const [open, setOpen] = React.useState(false);

  const [newStudent, setNewStudent] = React.useState<Students>({
    code: "",
    lastName: "",
    firstName: "",
    email: "",
    phone: "",
    speciality: "",
    entryAt: undefined,
    firstDepartureMissionAt: undefined,
    createdAt: new Date(),
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setNewStudent((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setNewStudent((prev) => ({
      ...prev,
      [id]: value ? new Date(value) : undefined,
    }));
  };

  const handleSave = async () => {
    try {
      await fetchAddStudents(newStudent);
      if (onAdd) {
        onAdd(newStudent);
      }
      setOpen(false);
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'étudiant", error);
    }
  };

  return (
    <>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        Create
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Ajouter un étudiant
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              "& > :not(style)": { m: 1 },
            }}
          >
            <TextField
              helperText="Please enter your name"
              id="lastName"
              label="Nom de famille"
              value={newStudent.lastName}
              onChange={handleInputChange}
            />
            <TextField
              helperText=" "
              id="firstName"
              label="Prénom"
              value={newStudent.firstName}
              onChange={handleInputChange}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              "& > :not(style)": { m: 1 },
            }}
          >
            <TextField
              helperText="Please enter your code"
              id="code"
              label="Code"
              value={newStudent.code}
              onChange={handleInputChange}
            />
            <TextField
              helperText=" "
              id="speciality"
              label="Spécialité"
              value={newStudent.speciality}
              onChange={handleInputChange}
            />
          </Box>

          <Box
            sx={{
              width: 430,
              maxWidth: "100%",
              marginLeft: "2px",
              "& > :not(style)": { m: 1 },
            }}
          >
            <TextField
              fullWidth
              label="E-mail"
              id="email"
              value={newStudent.email}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              label="Téléphone"
              id="phone"
              value={newStudent.phone}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              label="Date début de formation"
              id="entryAt"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={
                newStudent.entryAt instanceof Date &&
                !isNaN(newStudent.entryAt.getTime())
                  ? newStudent.entryAt.toISOString().split("T")[0]
                  : ""
              }
              onChange={handleDateChange}
            />
            <TextField
              fullWidth
              label="Date d'épart en mission"
              id="firstDepartureMissionAt"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={
                newStudent.firstDepartureMissionAt instanceof Date &&
                !isNaN(newStudent.firstDepartureMissionAt.getTime())
                  ? newStudent.firstDepartureMissionAt
                      .toISOString()
                      .split("T")[0]
                  : ""
              }
              onChange={handleDateChange}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
