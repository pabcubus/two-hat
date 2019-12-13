import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { QRCodeModule } from 'angular2-qrcode';

import { ComponentsModule } from '../components/components.module';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

const components: Array<any> = [
  HomeComponent,
  AboutComponent,
];

@NgModule({
  imports: [
    QRCodeModule,
    HttpClientModule,
    CommonModule,
    RouterModule,
    FormsModule,
    ChartsModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
  declarations: [...components],
  schemas: []
})
export class ScreensModule { }
