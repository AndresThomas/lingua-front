import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeclassdialogComponent } from './takeclassdialog.component';

describe('TakeclassdialogComponent', () => {
  let component: TakeclassdialogComponent;
  let fixture: ComponentFixture<TakeclassdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TakeclassdialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TakeclassdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
