import axios from "axios";
import { Students } from "../models/students";

const API_URL = "http://localhost:8080/api/students";

/**
 * Récupération de tous les étudiants
 */
export const fetchAllStudents = async (): Promise<Students[]> => {
  const response = await axios.get(`${API_URL}/all-students`);
  return response.data;
};

/**
 * Supprimer un étudiant par email
 */
export const fetchDeleteStudents = async (email: string): Promise<void> => {
  try {
    // Envoie une requête DELETE à l'API avec l'email de l'étudiant dans la query string
    await axios.delete(`${API_URL}/email?email=${email}`);

    // Logique pour mettre à jour les données dans l'UI, si nécessaire (par exemple, dans React)
    console.log(`Étudiant avec l'email ${email} supprimé avec succès.`);
  } catch (error: unknown) {
    // Vérification du type de l'erreur (AxiosError)
    if (axios.isAxiosError(error)) {
      // Gestion d'une erreur Axios spécifique
      console.error(
        "Erreur lors de la suppression de l'étudiant:",
        error.response?.data || error.message
      );
    } else {
      // Gestion d'une erreur inconnue
      console.error(
        "Erreur inconnue lors de la suppression de l'étudiant:",
        error
      );
    }
  }
};

/**
 * Ajouter un étudiant
 */
export const fetchAddStudents = async (
  student: Students
): Promise<Students | undefined> => {
  try {
    // Remplacer l'URL par celle de votre API
    const response = await axios.post(`${API_URL}/save-student`, student, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Réponse après que l'étudiant a été ajouté avec succès
    console.log("Étudiant enregistré :", response.data);
    return response.data;
  } catch (error: unknown) {
    // Vérification du type de l'erreur (AxiosError)
    if (axios.isAxiosError(error)) {
      // Gestion d'une erreur Axios spécifique
      console.error(
        "Erreur lors de l'enregistrement de l'étudiant :",
        error.response?.data || error.message
      );
    } else {
      // Gestion d'une erreur inconnue
      console.error(
        "Erreur inconnue lors de l'enregistrement de l'étudiant :",
        error
      );
    }
  }
};

/**
 * Récupérer un étudiant par son code ou son email
 */
export const fetchGetByCodeOrEmail = async (
  code: string,
  email: string
): Promise<Students[]> => {
  try {
    let url = "";

    if (email) {
      url = `${API_URL}/email?email=${email}`;
    } else if (code) {
      url = `${API_URL}/code?code=${code}`;
    } else {
      throw new Error("Le code ou l'email est requis.");
    }

    const response = await axios.get<Students[]>(url);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération de l'étudiant :", error);
    return [];
  }
};

/**
 * Fonction pour mettre à jour les informations d'un étudiant via une requête PUT à l'API.
 *
 * @param {string} code - Le code de l'étudiant à mettre à jour (sera passé comme paramètre de requête).
 * @param {Students} studentData - L'objet contenant les nouvelles données de l'étudiant (sera envoyé dans le corps de la requête).
 * @returns {Promise<Students>} - Une promesse qui résout avec l'objet étudiant mis à jour si la requête réussit,
 * ou rejette avec une erreur si la requête échoue.
 */
export const fetchPut = async (
  code: string,
  studentData: Students
): Promise<Students> => {
  try {
    const response = await axios.put(
      `${API_URL}/code?code=${code}`,
      studentData
    );

    // La requête a réussi, la réponse contient l'étudiant mis à jour
    return response.data;
  } catch (error: any) {
    // Une erreur s'est produite lors de la requête
    if (error.response && error.response.status === 404) {
      // Le serveur a répondu avec un statut 404 (Not Found)
      console.error(
        `Étudiant avec le code "${code}" non trouvé pour la mise à jour.`
      );
      throw new Error(`Étudiant avec le code "${code}" non trouvé.`);
    } else {
      // Autre erreur (réseau, serveur, etc.)
      console.error("Erreur lors de la mise à jour de l'étudiant:", error);
      throw new Error("Erreur lors de la mise à jour de l'étudiant.");
    }
  }
};
