import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CreateStudentComponent } from '../create-student/create-student.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule, MatInputModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  searchQuery: string = '';

  onSearch() {
    console.log('Recherche :', this.searchQuery);
  }
  readonly dialog = inject(MatDialog);

  openDialog() {
    const dialogRef = this.dialog.open(CreateStudentComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
