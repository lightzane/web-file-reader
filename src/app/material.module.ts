import { NgModule } from "@angular/core";

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
    exports: [
        MatButtonModule,
        MatIconModule,
        MatChipsModule,
    ]
})
export class MaterialModule { }