import { Component, OnInit,  Input } from '@angular/core';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  @Input("signUpForm") signup;
  

  constructor() { }

  ngOnInit(): void {
  }

  
}
