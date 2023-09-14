import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

import { NavComponent } from './nav.component';
import { AuthService } from '../services/auth.service';
import { ModalService } from '../services/modal.service';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;
  const mockedAuthService = jasmine.createSpyObj(
    'AuthService',
    ['createUser', 'logout'],
    {
      isAuthenticated$: of(true),
    }
  );

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavComponent ],
      providers: [
        { provide: AuthService, useValue: mockedAuthService}
      ],
      imports: [RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

	it('should logout', () => {
		const logoutLink = fixture.debugElement.query(By.css('li:nth-child(3) a'));

		expect(logoutLink).withContext("Not logged in").toBeTruthy();
	});

	it('should logout when logout link is clicked', () => {
		const logoutLink = fixture.debugElement.query(By.css('li:nth-child(3) a'));

		logoutLink.triggerEventHandler('click', { preventDefault: () => {} });

		expect(mockedAuthService.logout).withContext("logout click event is not working").toHaveBeenCalled();
	});

	it('should open modal', () => {
		const openModalLink = fixture.debugElement.query(By.css('li:nth-child(2) a'));

		expect(openModalLink).withContext("Logged in").toBeTruthy();
	});


});
