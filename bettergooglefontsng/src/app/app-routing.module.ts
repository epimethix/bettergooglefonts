import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassifierComponent } from './classifier/classifier.component';
import { FontoverviewComponent } from './fontoverview/fontoverview.component';

const routes: Routes = [
  {path: '', component: FontoverviewComponent},
  {path: 'classify/:name', component: ClassifierComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
