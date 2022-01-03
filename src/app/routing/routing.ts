import { Routes } from "@angular/router";

export const routing: Routes = [
    {
        path: '',
        loadChildren: () => import('../features/landing/landing.module').then(m => m.LandingModule),
    }
];