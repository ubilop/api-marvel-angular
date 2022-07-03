import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MarvelapiService } from './services/marvelapi.service';
import { AuthService } from './services/auth.service';
import { NgxPaginationModule} from 'ngx-pagination';
import { HeaderComponent } from './pages/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { SlideComponent } from './pages/home/slide/slide.component';
import { CharactersComponent } from './pages/home/characters/characters.component';
import { CharetersAllComponent } from './pages/chareters-all/chareters-all.component';
import { CharacterComponent } from './pages/character/character.component';
import { HighlightDirective } from './directives/highlight.directive';
import { FooterComponent } from './pages/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SlideComponent,
    CharactersComponent,
    CharetersAllComponent,
    CharacterComponent,
    HighlightDirective,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    MarvelapiService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
