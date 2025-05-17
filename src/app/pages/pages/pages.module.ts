import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PagesComponent } from './pages.component';

@NgModule({
  declarations: [],
  exports: [PagesComponent],
  providers: [],
  imports: [CommonModule, FormsModule, PagesComponent, PagesComponent],
})
export class PagesModule {}
