import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth/auth.component';
import { AuthGuard } from './core/auth.guard';

const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  {
    path: 'tickets',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./ticket/ticket.module').then((m) => m.TicketModule),
  },
  { path: '**', redirectTo: 'tickets' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
