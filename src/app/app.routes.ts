import {Routes} from '@angular/router';
import {HelpDeskComponent} from './dashboard/help-desk/help-desk.component';
import {NotFoundComponent} from './common/not-found/not-found.component';
import {UsersPageComponent} from './pages/users-page/users-page.component';
import {UsersListComponent} from './pages/users-page/users-list/users-list.component';
import {AddUserComponent} from './pages/users-page/add-user/add-user.component';
import {BlankPageComponent} from './blank-page/blank-page.component';
import {AuthenticationComponent} from './authentication/authentication.component';
import {SignInComponent} from './authentication/sign-in/sign-in.component';
import {LogoutComponent} from './authentication/logout/logout.component';
import {AuthGuard} from "./guardians/auth.guard";
import {NormPageComponent} from "./pages/norm-page/norm-page.component";
import {NormListComponent} from "./pages/norm-page/norm-list/norm-list.component";
import {NormStepperComponent} from "./pages/norm-page/norm-stepper/norm-stepper.component";
import {AuditsListComponent} from "./pages/audit-page/audits-list/audits-list.component";
import {AuditCreateComponent} from "./pages/audit-page/audit-create/audit-create.component";
import {AuditDetailsComponent} from "./pages/audit-page/audit-details/audit-details.component";
import {AuditExecutionComponent} from "./pages/audit-page/audit-execution/audit-execution.component";
import {AuditPageComponent} from "./pages/audit-page/audit-page.component";
import {AddNormComponent} from "./pages/norm-page/add-norm/add-norm.component";
import {NormEditComponent} from "./pages/norm-page/norm-edit/norm-edit.component";
import {ViewNormComponent} from "./pages/norm-page/view-norm/view-norm.component";
import {CoordinadorPageComponent} from "./pages/coordinador-page/coordinador-page.component";
import {
    AuditListCoordinadorComponent,
} from "./pages/coordinador-page/audit-list-coordinador/audit-list-coordinador.component";

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        canActivate: [AuthGuard],
        data: {roles: ['Administrador','Coordinador Laboratorio','Coordinador Instituto']},
        component: HelpDeskComponent
    },
    {
        path: 'users',
        component: UsersPageComponent,
        canActivate: [AuthGuard],
        data: {roles: ['Administrador']},
        children: [
            {path: '', component: UsersListComponent},
            {path: 'add-user', component: AddUserComponent}
        ]
    },
    {
        path: 'norms',
        component: NormPageComponent,
        canActivate: [AuthGuard],
        data: {roles: ['Administrador']},
        children: [
            {path: '', component: NormListComponent},
            {path: 'add-norm', component: AddNormComponent},
            {path: 'norm-edit/:id', component: NormEditComponent},
            {path: 'stepp-norm/:id', component: NormStepperComponent},
            {path: 'view-norm/:id', component: ViewNormComponent}
        ]
    },
    {
        path: 'audits',
        canActivate: [AuthGuard],
        data: {roles: ['Administrador']},
        component: AuditPageComponent,
        children: [
            {path: '', component: AuditsListComponent},
            {path: 'audit-create', component: AuditCreateComponent},
            {path: 'audit-edit/:id', component: AuditCreateComponent},
            {path: 'audit-details/:code', component: AuditDetailsComponent},
            {path: 'audit-execution/:code', component: AuditExecutionComponent}
        ]
    },

    {
        path: 'authentication',
        component: AuthenticationComponent,
        children: [
            {path: '', component: SignInComponent},
            {path: 'logout', component: LogoutComponent}
        ]
    },
    {
        path: 'coordinador',
        component: CoordinadorPageComponent,
        children: [
            {path: '', component: AuditListCoordinadorComponent},
            {path: 'create', component: AuditCreateComponent}
        ]
    },
    {path: 'blank-page', component: BlankPageComponent},
    {path: '**', component: NotFoundComponent}
];
