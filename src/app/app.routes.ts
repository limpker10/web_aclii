import { Routes } from '@angular/router';
import { EcommerceComponent } from './dashboard/ecommerce/ecommerce.component';
import { CrmComponent } from './dashboard/crm/crm.component';
import { ProjectManagementComponent } from './dashboard/project-management/project-management.component';
import { LmsComponent } from './dashboard/lms/lms.component';
import { HelpDeskComponent } from './dashboard/help-desk/help-desk.component';
import { EcommercePageComponent } from './pages/ecommerce-page/ecommerce-page.component';
import { EProductsGridComponent } from './pages/ecommerce-page/e-products-grid/e-products-grid.component';
import { EProductsListComponent } from './pages/ecommerce-page/e-products-list/e-products-list.component';
import { EProductDetailsComponent } from './pages/ecommerce-page/e-product-details/e-product-details.component';
import { ECreateProductComponent } from './pages/ecommerce-page/e-create-product/e-create-product.component';
import { ECartComponent } from './pages/ecommerce-page/e-cart/e-cart.component';
import { ECheckoutComponent } from './pages/ecommerce-page/e-checkout/e-checkout.component';
import { EOrdersListComponent } from './pages/ecommerce-page/e-orders-list/e-orders-list.component';
import { EOrderDetailsComponent } from './pages/ecommerce-page/e-order-details/e-order-details.component';
import { ECustomersListComponent } from './pages/ecommerce-page/e-customers-list/e-customers-list.component';
import { ESellersComponent } from './pages/ecommerce-page/e-sellers/e-sellers.component';
import { ESellerDetailsComponent } from './pages/ecommerce-page/e-seller-details/e-seller-details.component';
import { CrmPageComponent } from './pages/crm-page/crm-page.component';
import { CContactsComponent } from './pages/crm-page/c-contacts/c-contacts.component';
import { CCustomersComponent } from './pages/crm-page/c-customers/c-customers.component';
import { COpportunitiesComponent } from './pages/crm-page/c-opportunities/c-opportunities.component';
import { CLeadsComponent } from './pages/crm-page/c-leads/c-leads.component';
import { ProjectManagementPageComponent } from './pages/project-management-page/project-management-page.component';
import { PmProjectsListComponent } from './pages/project-management-page/pm-projects-list/pm-projects-list.component';
import { PmProjectDetailsComponent } from './pages/project-management-page/pm-project-details/pm-project-details.component';
import { PmCreateProjectComponent } from './pages/project-management-page/pm-create-project/pm-create-project.component';
import { PmClientsComponent } from './pages/project-management-page/pm-clients/pm-clients.component';
import { PmTeamsComponent } from './pages/project-management-page/pm-teams/pm-teams.component';
import { PmTasksComponent } from './pages/project-management-page/pm-tasks/pm-tasks.component';
import { PmUsersComponent } from './pages/project-management-page/pm-users/pm-users.component';
import { PmKanbanBoardComponent } from './pages/project-management-page/pm-kanban-board/pm-kanban-board.component';
import { LmsPageComponent } from './pages/lms-page/lms-page.component';
import { LCoursesListComponent } from './pages/lms-page/l-courses-list/l-courses-list.component';
import { LCourseDetailsComponent } from './pages/lms-page/l-course-details/l-course-details.component';
import { LLessonPreviewComponent } from './pages/lms-page/l-lesson-preview/l-lesson-preview.component';
import { LCreateCourseComponent } from './pages/lms-page/l-create-course/l-create-course.component';
import { HelpDeskPageComponent } from './pages/help-desk-page/help-desk-page.component';
import { HdTicketsComponent } from './pages/help-desk-page/hd-tickets/hd-tickets.component';
import { HdReportsComponent } from './pages/help-desk-page/hd-reports/hd-reports.component';
import { HdAgentsComponent } from './pages/help-desk-page/hd-agents/hd-agents.component';
import { EventsPageComponent } from './pages/events-page/events-page.component';
import { EventsListComponent } from './pages/events-page/events-list/events-list.component';
import { EventDetailsComponent } from './pages/events-page/event-details/event-details.component';
import { CreateAnEventComponent } from './pages/events-page/create-an-event/create-an-event.component';
import { SocialFeedPageComponent } from './pages/social-feed-page/social-feed-page.component';
import { InvoicesPageComponent } from './pages/invoices-page/invoices-page.component';
import { InvoicesComponent } from './pages/invoices-page/invoices/invoices.component';
import { InvoiceDetailsComponent } from './pages/invoices-page/invoice-details/invoice-details.component';
import { NotFoundComponent } from './common/not-found/not-found.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { UsersListComponent } from './pages/users-page/users-list/users-list.component';
import { AddUserComponent } from './pages/users-page/add-user/add-user.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { PUserProfileComponent } from './pages/profile-page/p-user-profile/p-user-profile.component';
import { PTeamsComponent } from './pages/profile-page/p-teams/p-teams.component';
import { PProjectsComponent } from './pages/profile-page/p-projects/p-projects.component';
import { StarterComponent } from './starter/starter.component';
import { IconsComponent } from './icons/icons.component';
import { MaterialSymbolsComponent } from './icons/material-symbols/material-symbols.component';
import { FeathericonsComponent } from './icons/feathericons/feathericons.component';
import { RemixiconComponent } from './icons/remixicon/remixicon.component';

import { TablesComponent } from './tables/tables.component';
import { FormsComponent } from './forms/forms.component';
import { BasicElementsComponent } from './forms/basic-elements/basic-elements.component';
import { AdvancedElementsComponent } from './forms/advanced-elements/advanced-elements.component';
import { WizardComponent } from './forms/wizard/wizard.component';
import { EditorsComponent } from './forms/editors/editors.component';
import { FileUploaderComponent } from './forms/file-uploader/file-uploader.component';
import { PricingPageComponent } from './pages/pricing-page/pricing-page.component';
import { TimelinePageComponent } from './pages/timeline-page/timeline-page.component';
import { FaqPageComponent } from './pages/faq-page/faq-page.component';
import { GalleryPageComponent } from './pages/gallery-page/gallery-page.component';
import { TestimonialsPageComponent } from './pages/testimonials-page/testimonials-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { BlankPageComponent } from './blank-page/blank-page.component';
import { InternalErrorComponent } from './common/internal-error/internal-error.component';
import { MapsPageComponent } from './pages/maps-page/maps-page.component';
import { NotificationsPageComponent } from './pages/notifications-page/notifications-page.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { SignInComponent } from './authentication/sign-in/sign-in.component';
import { SignUpComponent } from './authentication/sign-up/sign-up.component';
import { LogoutComponent } from './authentication/logout/logout.component';
import { ApexchartsComponent } from './apexcharts/apexcharts.component';
import { LineChartsComponent } from './apexcharts/line-charts/line-charts.component';
import { AreaChartsComponent } from './apexcharts/area-charts/area-charts.component';
import { ColumnChartsComponent } from './apexcharts/column-charts/column-charts.component';
import { MixedChartsComponent } from './apexcharts/mixed-charts/mixed-charts.component';
import { RadialbarChartsComponent } from './apexcharts/radialbar-charts/radialbar-charts.component';
import { RadarChartsComponent } from './apexcharts/radar-charts/radar-charts.component';
import { PieChartsComponent } from './apexcharts/pie-charts/pie-charts.component';
import { PolarChartsComponent } from './apexcharts/polar-charts/polar-charts.component';
import { MoreChartsComponent } from './apexcharts/more-charts/more-charts.component';
import {AuthGuard} from "./guardians/auth.guard";
import {NormPageComponent} from "./pages/norm-page/norm-page.component";
import {NormListComponent} from "./pages/norm-page/norm-list/norm-list.component";
import {NormStepperComponent} from "./pages/norm-page/norm-stepper/norm-stepper.component";

export const routes: Routes = [
    {path: '', component: EcommerceComponent},
    {path: 'crm', component: CrmComponent},
    {path: 'project-management', component: ProjectManagementComponent},
    {path: 'lms', component: LmsComponent},
    {path: 'help-desk', component: HelpDeskComponent},

    {
        path: 'ecommerce-page',
        component: EcommercePageComponent,
        children: [
            {path: '', component: EProductsGridComponent},
            {path: 'products-list', component: EProductsListComponent},
            {path: 'product-details', component: EProductDetailsComponent},
            {path: 'create-product', component: ECreateProductComponent},
            {path: 'cart', component: ECartComponent},
            {path: 'checkout', component: ECheckoutComponent},
            {path: 'orders-list', component: EOrdersListComponent},
            {path: 'order-details', component: EOrderDetailsComponent},
            {path: 'customers-list', component: ECustomersListComponent},
            {path: 'sellers', component: ESellersComponent},
            {path: 'seller-details', component: ESellerDetailsComponent}
        ]
    },
    {
        path: 'crm-page',
        component: CrmPageComponent,
        children: [
            {path: '', component: CContactsComponent},
            {path: 'opportunities', component: COpportunitiesComponent},
            {path: 'leads', component: CLeadsComponent},
            {path: 'customers', component: CCustomersComponent}
        ]
    },
    {
        path: 'project-management-page',
        component: ProjectManagementPageComponent,
        children: [
            {path: '', component: PmProjectsListComponent},
            {path: 'project-details', component: PmProjectDetailsComponent},
            {path: 'create-project', component: PmCreateProjectComponent},
            {path: 'clients', component: PmClientsComponent},
            {path: 'teams', component: PmTeamsComponent},
            {path: 'tasks', component: PmTasksComponent},
            {path: 'users', component: PmUsersComponent},
            {path: 'kanban-board', component: PmKanbanBoardComponent}
        ]
    },
    {
        path: 'lms-page',
        component: LmsPageComponent,
        children: [
            {path: '', component: LCoursesListComponent},
            {path: 'course-details', component: LCourseDetailsComponent},
            {path: 'lesson-preview', component: LLessonPreviewComponent},
            {path: 'create-course', component: LCreateCourseComponent}
        ]
    },
    {
        path: 'help-desk-page',
        component: HelpDeskPageComponent,
        children: [
            {path: '', component: HdTicketsComponent},
            {path: 'reports', component: HdReportsComponent},
            {path: 'agents', component: HdAgentsComponent}
        ]
    },
    {
        path: 'events',
        component: EventsPageComponent,
        children: [
            {path: '', component: EventsListComponent},
            {path: 'event-details', component: EventDetailsComponent},
            {path: 'create-an-event', component: CreateAnEventComponent}
        ]
    },
    {path: 'social-feed', component: SocialFeedPageComponent},
    {
        path: 'invoices',
        component: InvoicesPageComponent,
        children: [
            {path: '', component: InvoicesComponent},
            {path: 'invoice-details', component: InvoiceDetailsComponent}
        ]
    },
    {
        path: 'users',
        component: UsersPageComponent,
        canActivate: [AuthGuard],
        data: { roles: ['Administrador'] },
        children: [
            {path: '', component: UsersListComponent},
            {path: 'add-user', component: AddUserComponent}
        ]
    },
    {
        path: 'norms',
        component: NormPageComponent,
        canActivate: [AuthGuard],
        data: { roles: ['Administrador'] },
        children: [
            {path: '', component: NormListComponent},
            {path: 'add-norm', component: NormStepperComponent}
        ]
    },
    {
        path: 'profile',
        component: ProfilePageComponent,
        children: [
            {path: '', component: PUserProfileComponent},
            {path: 'teams', component: PTeamsComponent},
            {path: 'projects', component: PProjectsComponent}
        ]
    },
    {path: 'starter', component: StarterComponent},
    {
        path: 'icons',
        component: IconsComponent,
        children: [
            {path: '', component: MaterialSymbolsComponent},
            {path: 'feathericons', component: FeathericonsComponent},
            {path: 'remixicon', component: RemixiconComponent}
        ]
    },

    {path: 'tables', component: TablesComponent},
    {
        path: 'forms',
        component: FormsComponent,
        children: [
            {path: '', component: BasicElementsComponent},
            {path: 'advanced-elements', component: AdvancedElementsComponent},
            {path: 'wizard', component: WizardComponent},
            {path: 'editors', component: EditorsComponent},
            {path: 'file-uploader', component: FileUploaderComponent}
        ]
    },
    {
        path: 'charts',
        component: ApexchartsComponent,
        children: [
            {path: '', component: LineChartsComponent},
            {path: 'area', component: AreaChartsComponent},
            {path: 'column', component: ColumnChartsComponent},
            {path: 'mixed', component: MixedChartsComponent},
            {path: 'radialbar', component: RadialbarChartsComponent},
            {path: 'radar', component: RadarChartsComponent},
            {path: 'pie', component: PieChartsComponent},
            {path: 'polar', component: PolarChartsComponent},
            {path: 'more', component: MoreChartsComponent}
        ]
    },
    {
        path: 'authentication',
        component: AuthenticationComponent,
        children: [
            {path: '', component: SignInComponent},
            {path: 'sign-up', component: SignUpComponent},
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
