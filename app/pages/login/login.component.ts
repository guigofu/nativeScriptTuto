import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "../../shared/user/user";
import { UserService } from "../../shared/user/user.service";


@Component({
  selector: "login",
  providers: [UserService],
  templateUrl: "./pages/login/login.html",
  styleUrls: ["./pages/login/login-common.css", "./pages/login/login.css"]
})
export class LoginComponent {
  user: User;
  isLogginIn = true;
  isLoading = false;

  constructor(private router: Router, private userService: UserService) {
    this.user = new User();
    this.user.email = "test2@test2.com";
    this.user.password = "123";
  }
  submit() {
    if (this.isLogginIn) {
      this.login();
    } else {
      this.signUp();
    }
  }
  login() {
    this.isLoading = true;
    this.userService
      .login(this.user)
      .subscribe(        
        () => {
          this.router.navigate(["/list"]);
          this.isLoading = false;
        },
        error => {
          alert("Unfurtunately we could not find your account.")
          this.isLoading = false;
        }
      );
  }
  signUp() {
    this.userService.register(this.user).subscribe(
      () => {
        alert("Your account was successfully created.");
        this.toggleDisplay();
      },
      () => alert("Unfortunately we were unable to create your account.")
    );
  }
  toggleDisplay() {
    this.isLogginIn = !this.isLogginIn;
  }
}
