import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule, NzButtonSize } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-dash1',
  imports: [FormsModule, NzButtonModule, NzInputModule, NzIconModule],
  templateUrl: './dash1.component.html',
  styleUrl: './dash1.component.css',
})
export class Dash1Component {
  size: NzButtonSize = 'large';
}
