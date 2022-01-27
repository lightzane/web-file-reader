import { NgModule } from "@angular/core";

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

@NgModule({
    exports: [
        MatButtonModule,
        MatIconModule,
        MatChipsModule,
        MatSnackBarModule,
        MatCardModule,
        MatTableModule
    ]
})
export class MaterialModule { }