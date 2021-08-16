import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatelanguagedialogComponent } from './updatelanguagedialog.component';

describe('UpdatelanguagedialogComponent', () => {
  let component: UpdatelanguagedialogComponent;
  let fixture: ComponentFixture<UpdatelanguagedialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatelanguagedialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatelanguagedialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
