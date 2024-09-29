import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {

  form: FormGroup;
  name: FormControl = new FormControl("", [Validators.required]);
  email: FormControl = new FormControl("", [Validators.required, Validators.email]);
  message: FormControl = new FormControl("", [Validators.required, Validators.maxLength(256)]);
  honeypot: FormControl = new FormControl(""); // we will use this to prevent spam
  submitted: boolean = false; // show and hide the success message
  isLoading: boolean = false; // disable the submit button if we're loading
  responseMessage: string; // the response message to show to the user
  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.form = this.formBuilder.group({
      name: this.name,
      email: this.email,
      message: this.message,
      honeypot: this.honeypot
    });
  }

  onSubmit() {
    console.log(this.form.status);
    console.log("called");
    if (this.form.status == "VALID" && this.honeypot.value == "") {
      this.form.disable(); // disable the form if it's valid to disable multiple submissions
      var formData: any = new FormData();
      formData.append("name", this.form.get("name").value);
      formData.append("email", this.form.get("email").value);
      formData.append("message", this.form.get("message").value);
      console.log(formData);
      this.isLoading = true; // sending the post request async so it's in progress
      this.submitted = false; // hide the response message on multiple submits
      this.http.post(
        "https://script.google.com/macros/s/AKfycbzeKU9Iwm60FJL0ronk771R-h7Pl1eoWf82B8gaPLpmeIxhM_IBelk3m-Xgv53c83E/exec"
        , formData).subscribe(
          (response) => {
            // choose the response message
            console.log("result ", response["result"]);
            if (response["result"] == "success") {
              this.responseMessage = "Thanks for the message! We will get back to you soon!";
            } else {
              this.responseMessage = "Oops! Something went wrong... Reload the page and try again.";
            }
            this.form.enable(); // re enable the form after a success
            this.submitted = true; // show the response message
            this.isLoading = false; // re enable the submit button
            console.log(response);
          },
          (error) => {
            this.responseMessage = "Oops! An error occurred... Reload the page and try again.";
            this.form.enable(); // re enable the form after a success
            this.submitted = true; // show the response message
            this.isLoading = false; // re enable the submit button
            console.log("error ", error);
          }
        );
    }
  }
}
