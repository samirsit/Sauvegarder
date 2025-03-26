import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IhmComponent } from './ihm.component';

describe('IhmComponent', () => {
  let component: IhmComponent;
  let fixture: ComponentFixture<IhmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IhmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IhmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
