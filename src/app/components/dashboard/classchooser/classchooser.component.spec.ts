import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasschooserComponent } from './classchooser.component';

describe('ClasschooserComponent', () => {
  let component: ClasschooserComponent;
  let fixture: ComponentFixture<ClasschooserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClasschooserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClasschooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
