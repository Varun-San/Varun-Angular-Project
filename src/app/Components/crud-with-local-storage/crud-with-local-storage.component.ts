import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crud-with-local-storage',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crud-with-local-storage.component.html',
  styleUrls: ['./crud-with-local-storage.component.css'],
})
export class CrudWithLocalStorageComponent implements OnInit {
  isNewUser: boolean = false;
  users: User[] = [];
  userForm: User = new User();
  editIndex: number | null = null; // Track index for editing

  constructor() {}

  states: string[] = [
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chhattisgarh',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal',
  ];

  ngOnInit(): void {
    this.loadUsers();
  }

  changeView() {
    this.isNewUser = !this.isNewUser;
  }

  loadUsers() {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
      console.log('Loaded users from localStorage:', this.users); // Debugging
    }
  }

  saveToLocalStorage() {
    localStorage.setItem('users', JSON.stringify(this.users));
    console.log('Saved users to localStorage:', this.users); // Debugging
  }

  addUser() {
    if (
      this.userForm.fName &&
      this.userForm.lName &&
      this.userForm.uName &&
      this.userForm.city &&
      this.userForm.state &&
      this.userForm.zipCode
    ) {
      if (this.editIndex === null) {
        // Adding new user
        this.users.push({ ...this.userForm });
      } else {
        // Editing existing user
        this.users[this.editIndex] = { ...this.userForm };
        this.editIndex = null; // Reset edit mode
      }

      this.saveToLocalStorage();
      this.userForm = new User(); // Reset form
      this.isNewUser = true; // Switch to list view
    } else {
      alert('Please fill in all fields.');
    }
  }

  editUser(index: number) {
    this.userForm = { ...this.users[index] }; // Copy user data to form
    this.editIndex = index; // Store index of the user being edited
    this.isNewUser = false; // Switch to form view
  }

  deleteUser(index: number) {
    this.users.splice(index, 1);
    this.saveToLocalStorage();
  }
}

class User {
  fName?: string;
  lName?: string;
  uName?: string;
  city?: string;
  state?: string;
  zipCode?: string;
}
