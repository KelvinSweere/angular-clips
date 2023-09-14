import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditComponent } from './edit.component';
import { ModalService } from 'src/app/services/modal.service';
import { ClipService } from 'src/app/services/clip.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import IClip from 'src/app/models/clip.model';

describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;

  // Mock services
  const modalServiceMock = {
    register: jasmine.createSpy(),
    unregister: jasmine.createSpy()
  };

  const clipServiceMock = {
    updateClip: jasmine.createSpy().and.returnValue(of(true))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditComponent ],
      imports: [ ReactiveFormsModule, FormsModule ],
      providers: [
        { provide: ModalService, useValue: modalServiceMock },
        { provide: ClipService, useValue: clipServiceMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should register and unregister modal', () => {
    expect(modalServiceMock.register).toHaveBeenCalledWith('editClip');
    component.ngOnDestroy();
    expect(modalServiceMock.unregister).toHaveBeenCalledWith('editClip');
  });

  it('should set values on ngOnChanges', () => {
    const clip: IClip = {
      docID: '1',
      title: 'Test Clip'
    };
    component.clip = clip;
    component.ngOnChanges();
    expect(component.docID.value).toBe(clip.docID);
    expect(component.title.value).toBe(clip.title);
  });

  it('should submit and update clip', async () => {
    const clip: IClip = {
      docID: '1',
      title: 'Test Clip'
    };
    component.clip = clip;

    await component.submit();
    expect(clipServiceMock.updateClip).toHaveBeenCalledWith(clip.docID, clip.title);
    expect(component.clip.title).toBe(clip.title);
  });

  it('should handle submit error', async () => {
    const clip: IClip = {
      docID: '1',
      title: 'Test Clip'
    };
    component.clip = clip;
    clipServiceMock.updateClip.and.returnValue(Promise.reject('Error'));

    await component.submit();
    expect(clipServiceMock.updateClip).toHaveBeenCalledWith(clip.docID, clip.title);
    expect(component.inSubmission).toBe(false);
    expect(component.alertColor).toBe('red');
    expect(component.alertMsg).toBe('Error! Could not update clip.');
  });
});
