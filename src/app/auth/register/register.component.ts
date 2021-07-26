import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  loading: boolean = false;
  showError: boolean = false;
  errorMessage: string = "";
  
  data: any = {};

  constructor(
    public auth: AngularFireAuth,
    public fire: AngularFirestore,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  daftar(formData: any) {
    this.loading = true;
    try {
      if(formData.valid) {
        this.auth.createUserWithEmailAndPassword(
          formData.value.email,
          formData.value.password
        ).then((resp) => {
          this.router.navigateByUrl('auth/login');
          this.data['role'] = 'user';
          this.fire.collection('user').add(this.data)
          this.loading = false;
        }).catch((err) => {
          this.loading = false;
          this.errorMessage = err['message'];
          this.showError = true;
        })
      } else {
        this.errorMessage = "Data tidak boleh kosong !";
        this.showError = true;
      }
    } catch(e) {
      this.loading = false;
    }

  }

  closeAlert() {
    this.showError = false;
  }

}
