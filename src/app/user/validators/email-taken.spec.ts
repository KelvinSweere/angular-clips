import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { EmailTaken } from './email-taken';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { of } from 'rxjs';

describe('EmailTakenValidator', () => {
  let emailTaken: EmailTaken;
  let mockAngularFireAuth: any;

  beforeEach(() => {
    mockAngularFireAuth = {
      fetchSignInMethodsForEmail: jasmine.createSpy('fetchSignInMethodsForEmail').and.returnValue(Promise.resolve([]))
    };

    TestBed.configureTestingModule({
      providers: [
        EmailTaken,
        { provide: AngularFireAuth, useValue: mockAngularFireAuth }
      ]
    });

    emailTaken = TestBed.inject(EmailTaken);
  });

  it('should be created', () => {
    expect(emailTaken).toBeTruthy();
  });

  // it('should return null if email is not taken', fakeAsync(() => {
  //   const control = { value: 'test@example.com' } as any;

  //   const result = emailTaken.validate(control);

  //   tick(); // Resolve the Promise

  //   result.then((errors) => {
  //     expect(errors).toBeNull();
  //   });
  // }));

  // it('should return emailTaken error if email is taken', fakeAsync(() => {
  //   const control = { value: 'taken@example.com' } as any;
  //   mockAngularFireAuth.fetchSignInMethodsForEmail.and.returnValue(Promise.resolve(['password']));

  //   const result = emailTaken.validate(control);

  //   tick(); 

  //   result.then((errors) => {
  //     expect(errors).toEqual({ emailTaken: true });
  //   });
  // }));
});
