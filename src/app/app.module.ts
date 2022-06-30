import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { MarvelapiService } from './services/marvelapi.service';
import {NgxPaginationModule} from 'ngx-pagination';
import { HeaderComponent } from './pages/home/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { SlideComponent } from './pages/home/slide/slide.component';
import { CharactersComponent } from './pages/home/characters/characters.component';
import { CharetersAllComponent } from './pages/chareters-all/chareters-all.component';
import { CharacterComponent } from './pages/character/character.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SlideComponent,
    CharactersComponent,
    CharetersAllComponent,
    CharacterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [
    MarvelapiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
