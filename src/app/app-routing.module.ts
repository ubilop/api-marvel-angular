import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { CharetersAllComponent } from './pages/chareters-all/chareters-all.component';
import { CharacterComponent } from './pages/character/character.component';

const routes: Routes = [

{path: '', component: HomeComponent },
{path: 'chareters-all', component: CharetersAllComponent },
{path: 'character/:id', component: CharacterComponent },
{path: '**', pathMatch:'full', redirectTo: '' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
