import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSortModule} from '@angular/material/sort';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatIconModule,
    HttpClientModule,
    MatTableModule,
    MatTooltipModule,
    MatSortModule,
    MatSelectModule,
    MatDialogModule,
    MatPaginatorModule,
    MatDividerModule,
    MatListModule
    
  ],
  exports:[
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatIconModule,
    HttpClientModule,
    MatTableModule,
    MatTooltipModule,
    MatSortModule,
    MatSelectModule,
    MatDialogModule,
    MatPaginatorModule,
    MatDividerModule,
    MatListModule
  ]
})
export class SharedModule { }
