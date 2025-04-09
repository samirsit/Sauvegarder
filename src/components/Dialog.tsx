import * as React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  TextField,
  Paper,
  PaperProps,
} from "@mui/material";
import Draggable from "react-draggable";
import { Students } from "../models/students";
import { fetchAddStudents } from "../service/studentsService";
import { fetchPut } from "../service/studentsService";

function PaperComponent(props: PaperProps) {
  const nodeRef = React.useRef<HTMLDivElement>(null);
  return (
    <Draggable nodeRef={nodeRef} handle="#draggable-dialog-title">
      <Paper ref={nodeRef} {...props} />
    </Draggable>
  );
}

interface DraggableDialogProps {
  open: boolean;
  mode: "create" | "edit";
  studentToEdit?: Students;
  onClose: () => void;
  onSave: (student: Students) => void;
}

export default function DraggableDialog({
  open,
  mode,
  studentToEdit,
  onClose,
  onSave,
}: DraggableDialogProps) {
  const [student, setStudent] = React.useState<Students>({
    code: "",
    lastName: "",
    firstName: "",
    email: "",
    phone: "",
    speciality: "",
    entryAt: new Date(),
    firstDepartureMissionAt: undefined,
    createdAt: new Date(),
  });

  React.useEffect(() => {
    if (mode === "edit" && studentToEdit) {
      setStudent(studentToEdit);
    } else {
      setStudent({
        code: "",
        lastName: "",
        firstName: "",
        email: "",
        phone: "",
        speciality: "",
        entryAt: new Date(),
        firstDepartureMissionAt: undefined,
        createdAt: new Date(),
      });
    }
  }, [mode, studentToEdit]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setStudent((prev) => ({ ...prev, [id]: value }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setStudent((prev) => ({
      ...prev,
      [id]: value ? new Date(value) : undefined,
    }));
  };

  const handleSave = async () => {
    try {
      let updatedStudent: Students;
      if (mode === "create") {
        updatedStudent = (await fetchAddStudents(student)) as Students;
      } else {
        updatedStudent = await fetchPut(student.code, student);
      }

      onSave(updatedStudent);
      onClose();
    } catch (error) {
      console.error("Erreur lors de la sauvegarde :", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} PaperComponent={PaperComponent}>
      <DialogTitle id="draggable-dialog-title">
        {mode === "edit" ? "Modifier l'étudiant" : "Ajouter un étudiant"}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
          <TextField
            id="lastName"
            label="Nom"
            value={student.lastName}
            onChange={handleInputChange}
          />
          <TextField
            id="firstName"
            label="Prénom"
            value={student.firstName}
            onChange={handleInputChange}
          />
        </Box>
        <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
          <TextField
            id="code"
            label="Code"
            value={student.code}
            disabled={mode === "edit"}
            onChange={handleInputChange}
          />
          <TextField
            id="speciality"
            label="Spécialité"
            value={student.speciality}
            onChange={handleInputChange}
          />
        </Box>
        <TextField
          fullWidth
          label="Email"
          id="email"
          value={student.email}
          onChange={handleInputChange}
          sx={{ mb: 1 }}
        />
        <TextField
          fullWidth
          label="Téléphone"
          id="phone"
          value={student.phone}
          onChange={handleInputChange}
          sx={{ mb: 1 }}
        />
        <TextField
          fullWidth
          id="entryAt"
          label="Date d’entrée"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={
            student.entryAt
              ? new Date(student.entryAt).toISOString().split("T")[0]
              : ""
          }
          onChange={handleDateChange}
          sx={{ mb: 1 }}
        />
        <TextField
          fullWidth
          id="firstDepartureMissionAt"
          label="Date départ mission"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={
            student.firstDepartureMissionAt
              ? new Date(student.firstDepartureMissionAt)
                  .toISOString()
                  .split("T")[0]
              : ""
          }
          onChange={handleDateChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Annuler</Button>
        <Button onClick={handleSave}>Sauvegarder</Button>
      </DialogActions>
    </Dialog>
  );
}
