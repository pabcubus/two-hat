import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PopoverModule } from 'ngx-bootstrap/popover';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HeaderComponent } from './header/header.component';
import { NpsGraphComponent } from './nps-graph/nps-graph.component';

const ngxBootstrapModules: Array<any> = [
  PopoverModule,
  ModalModule
];

const components: Array<any> = [
  HeaderComponent,
  NpsGraphComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ...ngxBootstrapModules.map(mod => mod.forRoot())
  ],
  exports: [
    ...ngxBootstrapModules,
    ...components
  ],
  declarations: [...components]
})
export class ComponentsModule { }
