import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirestoreService } from '../services/firestore/firestore.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(
    private fireService: FirestoreService,
    private router: Router
  ) { }

  ngOnInit(): void {
    
    /** Inicialización de formulario */
    this.loginForm = new FormGroup({
      username: new FormControl('', [ 
          Validators.required,
          Validators.email
      ]),
      password: new FormControl('', [ 
          Validators.required
      ])
    });
  }

  public onSubmit() {

    /**Validación de formulario */
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value; //Destructuración de objeto
      let userFireAuth = this.fireService.login(username, password);
      userFireAuth
      .then((isUserFireAuth: any) => {
        if (isUserFireAuth) {
          this.router.navigate(['/employee-list']);
        }
        console.log(isUserFireAuth)
      })
      .catch((err: any) => {

        /**Visualización de error */
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message
        });

        this.loginForm.reset();
      });
    }
  }

}
