import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components
import { CreateClientComponent } from './create-client/create-client.component';
import { FormClientsComponent } from './form-clients/form-clients.component';
import { ListClientsComponent } from './list-clients/list-clients.component';

const routes: Routes = [
  { path: '', component: ListClientsComponent },
  {
    path: 'clients',
    component: FormClientsComponent,
  },
  {
    path: 'create',
    component: CreateClientComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
