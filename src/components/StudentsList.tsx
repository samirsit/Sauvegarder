// Importation des composants nécessaires depuis Material UI
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Stack,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import BorderColorIcon from "@mui/icons-material/BorderColor";

import { useEffect, useState } from "react";

// Import du type Students (modèle de données)
import { Students } from "../models/students";

// Import des fonctions de service liées aux étudiants
import {
  fetchAllStudents,
  fetchDeleteStudents,
  fetchGetByCodeOrEmail,
} from "../service/studentsService";

// Import du composant de dialogue (formulaire d'ajout)
import DraggableDialog from "./Dialog";

function StudentsList() {
  // État pour stocker la liste des étudiants
  const [students, setStudents] = useState<Students[]>([]);

  // État pour gérer la valeur du champ de recherche
  const [searchText, setSearchText] = useState("");

  // État pour stocker le résultat de la recherche
  const [searchResults, setSearchResults] = useState<Students[]>([]);

  // useEffect : appel automatique au chargement du composant pour récupérer tous les étudiants
  useEffect(() => {
    const getStudents = async () => {
      const data = await fetchAllStudents(); // Récupère les étudiants via API
      setStudents(data); // Mise à jour de l'état principal
    };
    getStudents();
  }, []);

  /**
   * Fonction pour supprimer un étudiant (par son email)
   * @param email
   */
  const handleDeleteStudent = (email: string) => {
    fetchDeleteStudents(email)
      .then(() => {
        // Mise à jour de la liste après suppression
        setStudents((prev) =>
          prev.filter((student) => student.email !== email)
        );
        // Mise à jour des résultats de recherche si l'étudiant supprimé était affiché
        setSearchResults((prev) =>
          prev.filter((student) => student.email !== email)
        );
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression de l'étudiant", error);
      });
  };

  /**
   * Fonction appelée après l'ajout d'un étudiant via le formulaire
   * @param newStudent
   */
  const handleAddStudent = (newStudent: Students) => {
    setStudents((prevStudents) => [...prevStudents, newStudent]);
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
    <div>
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
        </div>

        {/* Formulaire d'ajout d'étudiant dans un dialogue draggable */}
        <DraggableDialog onAdd={handleAddStudent} />
      </Stack>

      {/* Table des étudiants */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {/* En-têtes des colonnes */}
              <TableCell>Code</TableCell>
              <TableCell>Nom</TableCell>
              <TableCell>Prénom</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Téléphone</TableCell>
              <TableCell>Spécialité</TableCell>
              <TableCell>Entrée</TableCell>
              <TableCell>Départ mission</TableCell>
              <TableCell>Créé le</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Affichage des étudiants ligne par ligne */}
            {students.map((student) => (
              <TableRow key={student.code}>
                <TableCell>{student.code}</TableCell>
                <TableCell>{student.lastName}</TableCell>
                <TableCell>{student.firstName}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.phone}</TableCell>
                <TableCell>{student.speciality}</TableCell>
                <TableCell>
                  {new Date(student.entryAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {student.firstDepartureMissionAt
                    ? new Date(
                        student.firstDepartureMissionAt
                      ).toLocaleDateString()
                    : "N/A"}
                </TableCell>
                <TableCell>
                  {new Date(student.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Stack direction="row" spacing={0} my={3}>
                    {/* Bouton pour supprimer un étudiant */}
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteStudent(student.email)}
                    >
                      <BorderColorIcon color="primary" />
                    </IconButton>

                    {/* Bouton pour modifier un étudiant */}
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteStudent(student.email)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default StudentsList;
