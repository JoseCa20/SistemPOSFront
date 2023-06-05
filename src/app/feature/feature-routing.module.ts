import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthWithGuard } from '../core/guards/auth-with.guard';
import { AuthWithoutGuard } from '../core/guards/auth-without.guard';
import { GuardService } from '../core/services/guard.service';

const routes: Routes = [
  {
    path: "autenticacion",
    canActivate: [() => inject(GuardService).canActiveWithAuth()],
    loadChildren: () => import("./auth/auth.module").then(a => a.AuthModule)
  },
  {
    path: "portafolio",
    canActivate: [() => inject(GuardService).canActiveWithoutAuth()],
    loadChildren: () => import("./home/home.module").then(a => a.HomeModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureRoutingModule { }
