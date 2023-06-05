import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { AuthLoginRequestDto } from 'src/app/core/dto/authLoginRequestDto';
import { AuthService } from 'src/app/core/services/auth.service';
import { TokenService } from 'src/app/core/services/token.service';
import { AppBaseComponent } from 'src/app/core/utils/appBaseComponent';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends AppBaseComponent{

  /**
   * formulario reactivo de login
   */
  public loginForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService, private tokenService: TokenService){ 
    super();  
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  public async signIn(): Promise<void>{

    let dtoLogin: AuthLoginRequestDto;

    if(this.loginForm.valid){
      alert("Bienvenido");
      
      let email = this.loginForm.get('email').value;
      let password = this.loginForm.get('password').value;
      dtoLogin = {
        email,
        password
      }  
      
      await lastValueFrom(this.authService.signIn(dtoLogin));
      
      console.log(this.tokenService.getToken());

      await this.router.navigateByUrl("/portafolio")

    }else{
      alert("Errores en el formulario");
      console.log(this.getAllErrorsForm(this.loginForm));
      this.loginForm.markAllAsTouched();
    }
  } 

  public getErrorsForm(field: string){
    let message;
    if(this.isTouchedField(this.loginForm, field)){
      if(this.loginForm.get(field).hasError('required')){
        message = ' El campo es requerido!'
      }else if(this.loginForm.get(field).hasError('email')){
        message = ' El formato de email es incorrecto!'
      }    
    }
    return message;
  }

}
