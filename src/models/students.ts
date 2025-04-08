export interface Students {
  code: string;
  lastName: string;
  firstName: string;
  email: string;
  phone: string;
  speciality: string;
  entryAt: Date;
  firstDepartureMissionAt?: Date; // Utilisation de '?' pour indiquer que ce champ est optionnel
  createdAt: Date;
}
