import { Routes } from '@angular/router';
import { DiagramComponent } from './diagram/diagram.component';
import { HomeComponent } from './home/home.component';

export const rootRouterConfig: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'diagram', component: DiagramComponent }
];
