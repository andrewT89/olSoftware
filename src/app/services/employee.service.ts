import { Injectable } from '@angular/core';
import { EmployeeModel } from '../models/employee.model';
import { AngularFirestore } from '@angular/fire/firestore';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private afs: AngularFirestore) {}

  public create(employee: EmployeeModel) {
    return new Promise<any>((resolve, reject) => {
      this.afs
        .collection('employee')
        .add(employee)
        .then(
          (res) => {
            if (res) {
              resolve(res);
              Swal.fire({
                icon: 'success',
                title: 'Registro exitoso',
                showConfirmButton: false,
                timer: 1500,
              });
            }
          },
          (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'No fue posible realizar el registro!'
            });
            reject(err);
          }
        );
    });
  }

  public update(employee: EmployeeModel) {
    return new Promise<any>((resolve, reject) => {
      this.afs
      .doc('employee/' + employee.id)
      .update(employee)
      .then(res => Swal.fire({
        icon: 'success',
        title: 'Actualización exitosa',
        showConfirmButton: false,
        timer: 1500,
      }),
      (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No fue posible actualizar el registro!'
        });
        reject(err);
      })
    });
  }

  public delete(employeeId: string) {
    return new Promise<any>((resolve, reject) => {
      this.afs
      .doc('employee/' + employeeId)
      .delete()
      .then(res => resolve(),
      (err) => {
        reject(err);
      })
    });
  }

  public getStates() {
      return this.afs.collection('states').snapshotChanges()
  }

  public getRoles() {
    return this.afs.collection('roles').snapshotChanges();
  }

  public getAllEmployeess() {
    return this.afs.collection('employee').snapshotChanges();
  }
}
