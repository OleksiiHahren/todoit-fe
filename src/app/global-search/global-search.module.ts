import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalSearchInputComponent } from './components/global-search-input/global-search-input.component';
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";



@NgModule({
  declarations: [
    GlobalSearchInputComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatIconModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  exports: [GlobalSearchInputComponent]
})
export class GlobalSearchModule { }
