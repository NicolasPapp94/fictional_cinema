import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { PhotoService } from 'src/app/services/photo.service';
import { StorageService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.page.html',
  styleUrls: ['./new-account.page.scss'],
})
export class NewAccountPage implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private menu: MenuController,
    private _toastService: ToastService,
    private _photoService: PhotoService,
    private _storageService: StorageService,
    private _authService: AuthService
  ) {

    this.menu.enable(false)

  }


  loginForm: FormGroup;
  submitted = false;
  userImage = "assets/images/uploadImage.png";
  passwordType = "password";
  eyeIcon = "eye-off";


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
      this.checkUser();
    }
  }

  toggleView() {
    this.passwordType = this.passwordType === "text" ? "password" : "text";
    this.eyeIcon = this.eyeIcon === "eye-off" ? "eye" : "eye-off"
  }

  uploadImage() {
    this._photoService.takePicture().then((photo) => {
      this.userImage = photo;
    });
  }


  clearForm() {
    this.submitted = false;
    this.loginForm.reset();
  }

  checkUser() {
    this._storageService.getValue('users').then((storageInfo) => {
      let storageUsers = JSON.parse(storageInfo.value);
      let result = storageUsers?.filter(user => user.username == this.loginForm.value.username);

      if (result && result?.length > 0) {
        this._toastService.simpleToast('User already taken', 'danger', 'top');
      } else {
        this._authService.registerUser(this.loginForm.value, this.userImage);
        this.clearForm();
        this.router.navigate(["login"]);
      }
    });
  }
}
