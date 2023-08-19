import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { User } from '../../_models/user.model';
import { UsersService } from '../../_services/users.service';

import { UsersComponent } from './users.component';
import { MatIconModule } from '@angular/material/icon';
import { UiService } from 'src/app/_services/ui.service';

describe('usersListComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let usersServiceMock: any;
  let matDialogMock: any;
  let mockUserData: User[];
  let matDialogRefMock: MatDialogRef<any>;
  let uiServiceMock: any;

  beforeEach(async () => {
    usersServiceMock = jasmine.createSpyObj('usersService', [
      'getAllUsers',
      'updateUser',
      'deleteUser',
      'addUser',
    ]);
    
    uiServiceMock = jasmine.createSpyObj('uiService', [
      'showSnackBar'
    ])

    matDialogRefMock = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);

    matDialogMock = jasmine.createSpyObj('MatDialog', ['open']);
    matDialogMock.open.and.returnValue(matDialogRefMock);

    await TestBed.configureTestingModule({
      declarations: [UsersComponent],
      imports: [
        MatIconModule, // Add MatIconModule here
      ],
      providers: [
        { provide: UsersService, useValue: usersServiceMock },
        { provide: MatDialog, useValue: matDialogMock },
        { provide: UiService, useValue: uiServiceMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    mockUserData = [
      {
        id: 1,
        email: 'test@test.com',
        first_name: 'first_name',
        last_name: 'last_name',
        avatar: 'image-1.jpg',
      },
      {
        id: 2,
        email: 'test@test.com',
        first_name: 'first_name',
        last_name: 'last_name',
        avatar: 'image-1.jpg',
      },
      {
        id: 3,
        email: 'test@test.com',
        first_name: 'first_name',
        last_name: 'last_name',
        avatar: 'image-1.jpg',
      },
    ];
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should get users successfully', () => {
    const getUsersSpy =
      usersServiceMock.getAllUsers.and.returnValue(of(mockUserData));
    component.ngOnInit();
    expect(getUsersSpy).toHaveBeenCalled();
  });

  it('should delete a user', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    const deleteUserspy = usersServiceMock.deleteUser.and.returnValue(
      of({})
    );
    component.removeUser(mockUserData[0]);
    expect(deleteUserspy).toHaveBeenCalledWith(mockUserData[0].id);
  });

  it('should edit a user', () => {
    const updateuserspy = usersServiceMock.updateUser.and.returnValue(
      of({})
    );
    const showSnackBarSpy = uiServiceMock.showSnackBar.and.returnValue(
      of({})
    )
    component.updateUser(1, mockUserData[0]);
    expect(updateuserspy).toHaveBeenCalledWith(1, mockUserData[0]);
  });

});
