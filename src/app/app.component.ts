import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('flipState', [
      state(
        'active',
        style({
          transform: 'rotateY(179deg)',
        })
      ),
      state(
        'inactive',
        style({
          transform: 'rotateY(0)',
        })
      ),
      transition('active => inactive', animate('500ms ease-out')),
      transition('inactive => active', animate('500ms ease-in')),
    ]),
  ],
})
export class AppComponent implements OnInit {
  title = 'profile-card';
  firstName = 'John';
  lastName = 'Doe';
  officeLocation = 'One Inside';

  editProfile: FormGroup;
  isFormSubmitted = false;

  flip: string = 'inactive';

  constructor() {}

  ngOnInit() {
    this.initForm();
  }

  toggleFlip() {
    this.flip = this.flip == 'inactive' ? 'active' : 'inactive';
  }

  initForm() {
    this.editProfile = new FormGroup({
      firstName: new FormControl<string>('', {
        nonNullable: true,
      }),
      lastName: new FormControl<string>('', {
        nonNullable: true,
      }),
      officeLocation: new FormControl<string>('', {
        nonNullable: true,
      }),
    });
  }

  onFormSubmit() {
    this.isFormSubmitted = true;
    if (this.editProfile.invalid) return;

    const { firstName, lastName, officeLocation } = this.editProfile.value;
    if (!firstName && !lastName && !officeLocation) return;

    localStorage.setItem('form-data', JSON.stringify(this.editProfile.value));

    const formValues = localStorage.getItem('form-data');
    if (!formValues) return;
    const data = JSON.parse(formValues);

    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.officeLocation = data.officeLocation;

    this.editProfile.reset();

    this.flip = this.flip == 'inactive' ? 'active' : 'inactive';
  }
}
