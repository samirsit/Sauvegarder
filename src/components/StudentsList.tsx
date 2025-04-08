import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { Students } from "../models/students";

interface StudentsListProps {
  students: Students[];
}

function StudentsList({ students }: StudentsListProps) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Code</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Speciality</TableCell>
            <TableCell>Entry At</TableCell>
            <TableCell>First Departure Mission At</TableCell>
            <TableCell>Created At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((student) => {
            // Convertir les chaînes de caractères en objets Date
            const entryAtDate = student.entryAt
              ? new Date(student.entryAt)
              : null;
            const firstDepartureMissionAtDate = student.firstDepartureMissionAt
              ? new Date(student.firstDepartureMissionAt)
              : null;
            const createdAtDate = student.createdAt
              ? new Date(student.createdAt)
              : null;

            return (
              <TableRow key={student.code}>
                <TableCell>{student.code}</TableCell>
                <TableCell>{student.lastName}</TableCell>
                <TableCell>{student.firstName}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.phone}</TableCell>
                <TableCell>{student.speciality}</TableCell>
                <TableCell>
                  {entryAtDate ? entryAtDate.toLocaleDateString() : "N/A"}
                </TableCell>
                <TableCell>
                  {firstDepartureMissionAtDate
                    ? firstDepartureMissionAtDate.toLocaleDateString()
                    : "N/A"}
                </TableCell>
                <TableCell>
                  {createdAtDate ? createdAtDate.toLocaleDateString() : "N/A"}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default StudentsList;
