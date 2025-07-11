import {Routes} from '@angular/router';
import {HelpDeskComponent} from './dashboard/help-desk/help-desk.component';
import {NotFoundComponent} from './common/not-found/not-found.component';
import {UsersPageComponent} from './pages/users-page/users-page.component';
import {UsersListComponent} from './pages/users-page/users-list/users-list.component';
import {AddUserComponent} from './pages/users-page/add-user/add-user.component';
import {PricingPageComponent} from './pages/pricing-page/pricing-page.component';
import {TimelinePageComponent} from './pages/timeline-page/timeline-page.component';
import {FaqPageComponent} from './pages/faq-page/faq-page.component';
import {GalleryPageComponent} from './pages/gallery-page/gallery-page.component';
import {TestimonialsPageComponent} from './pages/testimonials-page/testimonials-page.component';
import {SearchPageComponent} from './pages/search-page/search-page.component';
import {BlankPageComponent} from './blank-page/blank-page.component';
import {InternalErrorComponent} from './common/internal-error/internal-error.component';
import {MapsPageComponent} from './pages/maps-page/maps-page.component';
import {NotificationsPageComponent} from './pages/notifications-page/notifications-page.component';
import {AuthenticationComponent} from './authentication/authentication.component';
import {SignInComponent} from './authentication/sign-in/sign-in.component';
import {SignUpComponent} from './authentication/sign-up/sign-up.component';
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

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
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
        data: {roles: ['admin']},
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
    {path: 'pricing', component: PricingPageComponent},
    {path: 'timeline', component: TimelinePageComponent},
    {path: 'faq', component: FaqPageComponent},
    {path: 'gallery', component: GalleryPageComponent},
    {path: 'testimonials', component: TestimonialsPageComponent},
    {path: 'search', component: SearchPageComponent},
    {path: 'blank-page', component: BlankPageComponent},
    {path: 'internal-error', component: InternalErrorComponent},
    {path: 'maps', component: MapsPageComponent},
    {path: 'notifications', component: NotificationsPageComponent},

    // Here add new pages component

    {path: '**', component: NotFoundComponent} // This line will remain down from the whole pages component list
];
