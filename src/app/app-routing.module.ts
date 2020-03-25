import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskViewComponent } from './components/pages/task-view/task-view.component';
import { NewListComponent } from './components/pages/new-list/new-list.component';
import { NewTaskComponent } from './components/pages/new-task/new-task.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';

const routes: Routes = [
  {path: '', redirectTo: 'lists', pathMatch: 'full'},
  {path: 'lists', component: TaskViewComponent},
  {path: 'lists/:listId', component: TaskViewComponent},
  {path: 'new-list', component: NewListComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'lists/:listId/new-task', component: NewTaskComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
