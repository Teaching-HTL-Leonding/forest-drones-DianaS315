import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DronesComponent } from './drones/drones.component';
import { ExamineTreesComponent } from './drones/examine-trees/examine-trees.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/drones'},
  {path: 'drones', component: DronesComponent},
  {path: 'drones/examine-trees/:id/:xPos/:yPos', component: ExamineTreesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
