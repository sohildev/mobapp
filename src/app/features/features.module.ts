import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturesComponent } from './features.component';

@NgModule({
  declarations: [FeaturesComponent],
  imports: [
    CommonModule
  ], exports: [FeaturesComponent]
})
export class FeaturesModule { }
