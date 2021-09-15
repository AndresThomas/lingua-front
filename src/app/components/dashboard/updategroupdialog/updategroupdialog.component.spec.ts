import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdategroupdialogComponent } from './updategroupdialog.component';

describe('UpdategroupdialogComponent', () => {
  let component: UpdategroupdialogComponent;
  let fixture: ComponentFixture<UpdategroupdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdategroupdialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdategroupdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
