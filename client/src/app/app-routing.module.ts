import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth/auth.component';
import { AuthGuard } from './core/auth.guard';
import { TicketsComponent } from './ticket/tickets/tickets.component';

const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: '', component: TicketsComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
