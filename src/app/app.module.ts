import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { AppComponent } from './app.component';
import { ScreensModule } from './screens/screens.module';
import { ComponentsModule } from './components/components.module';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentsModule,
    ScreensModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
