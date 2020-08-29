import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { StateInterface } from '../../interfaces/state.interface';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RoleInterface } from '../../interfaces/role.interface';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent implements OnInit {
  public isCreateOrUpdate: boolean = false;
  public employeeForm: FormGroup = new FormGroup({
    id: new FormControl(null, []),
    names: new FormControl(null, [Validators.required]),
    lastNames: new FormControl(null, [Validators.required]),
    identification: new FormControl(null, [Validators.required]),
    role: new FormControl(null, [Validators.required]),
    state: new FormControl(null, [Validators.required]),
    phoneNumber: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  public states: StateInterface;
  public roles: RoleInterface;

  constructor(
    private employeeSer: EmployeeService,
    public dialogRef: MatDialogRef<EmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public dataDialog: any
    ) {}

  ngOnInit(): void {
    this.isCreateOrUpdate = this.dataDialog.isCreateOrUpdate; //asignación de creación o actualización de formulario

    if (!this.isCreateOrUpdate) {
      this.employeeForm.patchValue(this.dataDialog.dataEmployee);
      this.employeeForm.get('role').markAsTouched();
      this.employeeForm.get('state').markAsTouched();
    } 

    this.getRolesAndState();
    
  }

  public getRolesAndState() {
    /**Obtener los estados */
    this.employeeSer.getStates().subscribe((states: any) => {
      if (states) {
        this.states = states.map((el: any) => {
          return {
            id: el.payload.doc.id,
            ...el.payload.doc.data()
          } as StateInterface
        });
      }
    });

    /**Obtener los roles */
    this.employeeSer.getRoles().subscribe((roles: any) => {
      if (roles) {
        this.roles = roles.map(el => {
          return {
            id: el.payload.doc.id,
            ...el.payload.doc.data()
          } as StateInterface
        });
      }
    });
  }

  public createEmployee() {
    if (this.employeeForm.valid) {
      this.employeeSer.create(this.employeeForm.value)
      .then((res: any) => {
        console.log(res);
      });

      this.employeeForm.reset();
      this.dialogRef.close();
    }
  }

  public updateEmployee() {
    if (this.employeeForm.valid) {
      this.employeeSer.update(this.employeeForm.value);
      this.dialogRef.close();
    }
  }
}
