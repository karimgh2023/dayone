import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared/common/sharedmodule';
import { NgSelectModule } from '@ng-select/ng-select';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '@/app/shared/services/auth.service';
import { UserService } from '@/app/shared/services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataService } from '@/app/shared/services/data.service';
import { Department } from '@/app/models/department.model';
import { Plant } from '@/app/models/plant.model';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class EditProfileComponent implements OnInit {
  profileData: any = {};
  profilePhoto?: File;
  profilePhotoPreview: string = '';
  departments: Department[] = [];
  plants: Plant[] = [];

  constructor(
    private userService: UserService,
    private authService: AuthService,
     private dataService: DataService
  ) {}

ngOnInit(): void {
  const currentUser = this.authService.getUserFromToken();
  if (currentUser) {
    this.profileData = {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      phoneNumber: currentUser.phoneNumber,
      email: currentUser.email,
      department: null,
      plant: null
    };
    this.profilePhotoPreview = currentUser.profilePhoto || 'https://via.placeholder.com/150';

    this.loadDepartments(currentUser.department?.id);
    this.loadPlants(currentUser.plant?.id);
  }
}


loadDepartments(selectedId?: number): void {
  this.dataService.getDepartments().subscribe(depts => {
    this.departments = depts;
    if (selectedId) {
      this.profileData.department = this.departments.find(d => d.id === selectedId) || null;
    }
  });
}

loadPlants(selectedId?: number): void {
  this.dataService.getPlants().subscribe(plnts => {
    this.plants = plnts;
    if (selectedId) {
      this.profileData.plant = this.plants.find(p => p.id === selectedId) || null;
    }
  });
}



onFileSelected(event: any): void {
  if (event.target.files && event.target.files.length > 0) {
    this.profilePhoto = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.profilePhotoPreview = e.target.result;
    };

    // ✅ Safe check before using
    if (this.profilePhoto) {
      reader.readAsDataURL(this.profilePhoto);
    }
  } else {
    // Fallback to existing profile photo
    const currentUser = this.authService.getUserFromToken();
    this.profilePhotoPreview = currentUser?.profilePhoto || 'https://via.placeholder.com/150';
  }
}






  updateProfile(): void {
    const formattedProfile = {
      ...this.profileData,
      departmentId: this.profileData.department?.id,
      plantId: this.profileData.plant?.id
    };

    this.userService.updateMyProfile(formattedProfile, this.profilePhoto).subscribe({
      next: () => {
        alert('Profile updated successfully');
      },
      error: (err) => {
        console.error(err);
        alert('Failed to update profile');
      }
    });
  }
}
