import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  cinemaImage = "assets/images/noImage.png";
  passwordType = "password";
  eyeIcon = "eye-off";

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private menu: MenuController,
    private _toastService: ToastService,
    private _authService: AuthService,
    private _storageService: StorageService

  ) {
    this.menu.enable(false);
  }

  ionViewWillEnter() {
    this.clearForm();
    this.cinemaImage = "assets/images/noImage.png";
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    })
  }

  get errorCtr() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.loginForm.valid) {
      this._toastService.simpleToast("Something are wrong!", "danger", "top")
      return false;
    } else {
      let formValues = this.loginForm.value
      this._storageService.getValue('users').then((usersData) => {
        let users = JSON.parse(usersData.value);
        if (users) {
          let result = users.filter(user => user.username == formValues.username && user.password == formValues.password);
          if (result.length != []) {
            this._storageService.setValue('userData', JSON.stringify(result[0])).then(() => {
              this.clearForm();
              this._authService.setInitializedSession();
              this.router.navigate(["movies"]);
            });
          } else {
            this._toastService.simpleToast("Invalid credentials", "danger", "top");
          }
        } else {
          this._toastService.simpleToast("Invalid credentials", "danger", "top");
        }
      })

    }
  }

  inputChange(e) {
    let formValues = this.loginForm.value;
    this._storageService.getValue('users').then((usersData) => {
      let users = JSON.parse(usersData.value);
      if (users) {
        let result = users.filter(user => user.username == formValues.username);
        if (result.length != []) {
          this._storageService.setValue('userData', JSON.stringify(result[0]));
          this.cinemaImage = result[0].image;
        } else {
          this.cinemaImage = "assets/images/noImage.png";
        }
      }
    })
  }

  toggleView() {
    this.passwordType = this.passwordType === "text" ? "password" : "text";
    this.eyeIcon = this.eyeIcon === "eye-off" ? "eye" : "eye-off"
  }


  registerUser() {
    this.router.navigate(['new-account']);
  }

  clearForm() {
    this.submitted = false;
    this.loginForm.reset();
  }
}
