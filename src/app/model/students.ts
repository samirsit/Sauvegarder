export class Students {
  code: number;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  speciality: string;
  entryDate: Date;
  departureDate: Date;
  createdDate: Date;

  constructor(
    code: number,
    firstname: string,
    lastname: string,
    email: string,
    phone: string,
    speciality: string,
    entryDate: Date,
    departureDate: Date,
    createdDate: Date
  ) {
    this.code = code;
    this.firstname = firstname;
    this.lastname = lastname; // Initialisation dans le constructeur
    this.email = email;
    this.phone = phone;
    this.speciality = speciality;
    this.entryDate = entryDate;
    this.departureDate = departureDate;
    this.createdDate = createdDate;
  }
}
