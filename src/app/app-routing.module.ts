import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './auth/signin.component';
import { EmployeeComponent } from './employees/employee/employee.component';
import { EmployeesComponent } from './employees/employees.component';

const routes: Routes = [
  {path: '', component: SigninComponent, pathMatch: 'full'},
  { path: 'signin', component: SigninComponent },
  { path: 'employee-list', component: EmployeesComponent },
  { path: 'employee', component:  EmployeeComponent },
  { path: 'employee/:id', component: EmployeeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
