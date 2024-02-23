import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ContactIndexComponent } from './pages/contact-index/contact-index.component';
import { ContactDetailsComponent } from './pages/contact-details/contact-details.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';
import { ContactEditComponent } from './pages/contact-edit/contact-edit.component';
import { contactResolver } from './resolvers/contact.resolver';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'statistics', component: StatisticsComponent },
  {
    path: 'contacts', component: ContactIndexComponent, children: [
      { path: ':contactId', component: ContactDetailsComponent },
      { path: 'edit/:contactId', component: ContactEditComponent, resolve: { contact: contactResolver } },
      { path: 'edit/', component: ContactEditComponent },

    ]
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
]
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
