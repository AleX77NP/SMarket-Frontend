import { UsersService } from './../services/users.service';
import { UserMessage } from './../models/user-message';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contactForm: FormGroup;

  subjects: string[] = ["Kupovina", "Plaćanje", "Isporuka", "Usluge","Kuponi"];

  constructor(private fb: FormBuilder, private us: UsersService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.contactForm = this.fb.group({
       name: ['', Validators.required],
       email: ['', Validators.required],
       subject: ['', Validators.required],
       message: ['', Validators.required],
    })
  }

  get conts() {
    return this.contactForm.controls;
  }

  sendMessage() {
    if(this.contactForm.invalid) {
      alert("Forma nije validna");
      return;
    }
    let message = new UserMessage(this.conts.name.value, this.conts.email.value,this.conts.subject.value,this.conts.message.value);
    this.us.contactSeller(message).subscribe(res => {alert("Poruka poslata.")
    console.log(res),
    err => console.log(err);
  })
  }


}
