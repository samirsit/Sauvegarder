import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Button,
  Typography,
  Box,
  Stack,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Students } from "../models/students";
import {
  fetchAllStudents,
  fetchDeleteStudents,
  fetchGetByCodeOrEmail,
} from "../service/studentsService";
import DraggableDialog from "./Dialog";
import SearchIcon from "@mui/icons-material/Search";

export default function StudentsList() {
  const [students, setStudents] = useState<Students[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"create" | "edit">("create");
  const [selectedStudent, setSelectedStudent] = useState<Students | undefined>(
    undefined
  );
  // État pour stocker le résultat de la recherche
  const [searchResults, setSearchResults] = useState<Students[]>([]);
  // État pour gérer la valeur du champ de recherche
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const loadStudents = async () => {
      try {
        const data = await fetchAllStudents();
        setStudents(data);
      } catch (error) {
        console.error("Erreur lors du chargement des étudiants :", error);
      }
    };

    loadStudents();
  }, []);

  const handleAdd = () => {
    setDialogMode("create");
    setSelectedStudent(undefined);
    setDialogOpen(true);
  };

  const handleEdit = (student: Students) => {
    setDialogMode("edit");
    setSelectedStudent(student);
    setDialogOpen(true);
  };

  const handleSaveStudent = (student: Students) => {
    setStudents((prev) => {
      const exists = prev.find((s) => s.code === student.code);
      if (exists) {
        return prev.map((s) => (s.code === student.code ? student : s));
      }
      return [...prev, student];
    });
  };

  const handleDelete = async (email: string) => {
    try {
      await fetchDeleteStudents(email);
      setStudents((prev) => prev.filter((s) => s.email !== email));
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  /**
   * Fonction de recherche : appelle l'API pour chercher un étudiant par email ou code
   */
  const handleSearch = async () => {
    const encodedSearch = encodeURIComponent(searchText); // Sécurise la saisie pour l'URL
    try {
      const result = await fetchGetByCodeOrEmail(encodedSearch, encodedSearch);
      console.log("Résultat de la recherche :", result);
      setSearchResults(result); // Stocke les résultats de la recherche dans un état séparé
    } catch (error) {
      console.error("Erreur lors de la recherche :", error);
      setSearchResults([]); // Réinitialise les résultats en cas d'erreur
    }
  };

  // useEffect pour afficher les résultats de la recherche quand ils changent
  useEffect(() => {
    // Si searchResults a des éléments, on les affiche, sinon on affiche la liste complète des étudiants
    if (searchResults.length > 0) {
      console.log("Affichage des résultats de la recherche :", searchResults);
      // Ici, vous pouvez choisir comment afficher les résultats.
      // Par exemple, vous pouvez mettre à jour l'état 'students' pour afficher uniquement les résultats.
      setStudents(searchResults);
    } else if (searchText === "") {
      // Si le champ de recherche est vide, on réaffiche la liste complète
      fetchAllStudents().then((data) => setStudents(data));
    }
    // La dépendance de cet useEffect est searchResults, donc il s'exécutera chaque fois que searchResults change.
  }, [searchResults, searchText]);

  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom>
        Liste des étudiants
      </Typography>
      <Button variant="contained" onClick={handleAdd} sx={{ mb: 2 }}>
        Ajouter un étudiant
      </Button>
      {/* Barre de recherche + bouton "Ajouter" */}
      <Stack direction="row" spacing={2} my={3}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            type="text"
            placeholder="Search ..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{
              padding: "8px",
              marginRight: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              width: "500px",
            }}
          />
          <IconButton color="primary" onClick={handleSearch}>
            <SearchIcon />
          </IconButton>
        </div>{" "}
        {/* ✅ Fermeture du div */}
      </Stack>{" "}
      {/* ✅ Fermeture correcte du Stack */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Code</TableCell>
            <TableCell>Nom</TableCell>
            <TableCell>Prénom</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Téléphone</TableCell>
            <TableCell>Spécialité</TableCell>
            <TableCell>Date d’entrée</TableCell>
            <TableCell>Date mission</TableCell>
            <TableCell>Créé le</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student.code}>
              <TableCell>{student.code}</TableCell>
              <TableCell>{student.lastName}</TableCell>
              <TableCell>{student.firstName}</TableCell>
              <TableCell>{student.email}</TableCell>
              <TableCell>{student.phone}</TableCell>
              <TableCell>{student.speciality}</TableCell>
              <TableCell>
                {student.entryAt
                  ? new Date(student.entryAt).toLocaleDateString()
                  : ""}
              </TableCell>
              <TableCell>
                {student.firstDepartureMissionAt
                  ? new Date(
                      student.firstDepartureMissionAt
                    ).toLocaleDateString()
                  : ""}
              </TableCell>
              <TableCell>
                {new Date(student.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <IconButton onClick={() => handleEdit(student)}>
                  <EditIcon color="primary" />
                </IconButton>

                <IconButton onClick={() => handleDelete(student.email)}>
                  <DeleteIcon color="error" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <DraggableDialog
        open={dialogOpen}
        mode={dialogMode}
        studentToEdit={selectedStudent}
        onClose={() => setDialogOpen(false)}
        onSave={handleSaveStudent}
      />
    </Box>
  );
}
