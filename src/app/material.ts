import { NgModule } from '@angular/core';
import { MatButtonModule, MatDatepickerModule, MatNativeDateModule, MatIconModule, MatFormFieldModule, MatInputModule, MatSelectModule } from '@angular/material';
@NgModule({
    imports: [MatButtonModule, MatDatepickerModule, MatNativeDateModule, MatIconModule, MatFormFieldModule, MatInputModule, MatSelectModule],
    exports: [MatButtonModule, MatDatepickerModule, MatNativeDateModule, MatIconModule, MatFormFieldModule, MatInputModule, MatSelectModule]
})
export class MaterialModule {
    constructor() { }
} 