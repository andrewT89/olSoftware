import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeService } from '../services/employee.service';
import { EmployeeModel } from '../models/employee.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent implements OnInit {
  public dataSource = new MatTableDataSource<any>();
  public displayedColumns: string[] = [
    'names',
    'lastNames',
    'identification',
    'role',
    'state',
    'phoneNumber',
    'email',
    'acciones',
  ];

  constructor(public dialog: MatDialog, public employeeSer: EmployeeService) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  public newEmployee() {
    const dialog = this.dialog.open(EmployeeComponent, {
      data: {
        isCreateOrUpdate: true,
      },
    });

    dialog.afterClosed().subscribe(() => this.getEmployees());
  }

  public updateEmployee(data: EmployeeModel) {
    const dialogUpdate = this.dialog.open(EmployeeComponent, {
      data: {
        isCreateOrUpdate: false,
        dataEmployee: data,
      },
    });

    dialogUpdate.afterClosed().subscribe(() => this.getEmployees());
  }

  public deleteEmployee(idEmployee: string) {
    Swal.fire({
      title: 'Eliminar',
      text: 'Estas seguro de eliminar este registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar..!!!',
    }).then((result) => {
      if (result.value) {
        this.employeeSer.delete(idEmployee).then(() => {
          Swal.fire(
            'Eliminado!',
            'El registro se elimino exitosamente.',
            'success'
          );
          this.getEmployees()
        });
      }
    });
  }

  public getEmployees() {
    let dataSource: any[] = [];
    this.employeeSer.getAllEmployeess().subscribe((employees: any) => {
      if (employees) {
        employees.forEach((el: any) => {
          let model = el.payload;
          dataSource.push(new EmployeeModel(model));
        });

        this.dataSource = new MatTableDataSource(dataSource);
      }
    });
  }
}
