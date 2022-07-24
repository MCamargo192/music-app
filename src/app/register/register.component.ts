import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUser: any = {userName: "", password: "", password2: ""};
  warning;
  success: boolean = false;
  loading: boolean = false;
  registerSub: any;

  constructor(private auth: AuthService) { }

  ngOnInit(): void { }

  onSubmit(){
    if(this.registerUser.userName != "" && this.registerUser.password === this.registerUser.password2) {
      this.loading = true;
      this.registerSub = this.auth.register(this.registerUser).subscribe(
        success => {
          this.success = true;
          this.warning = null;
          this.loading = false;
        },
        err => {
          this.success = false;
          this.warning = err.error.message; 
          this.loading = false;
        });
    }
  } 

  ngOnDestroy(): void {
    this.registerSub.unsubscribe();
  }

}
