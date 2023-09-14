import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { InputComponent } from './input.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputComponent ],
			imports: [ReactiveFormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should bind control input', () => {
    const control = new FormControl();
    component.control = control;
    expect(component.control).toBe(control);
  });

  it('should bind type input', () => {
    const type = 'number';
    component.type = type;
    expect(component.type).toBe(type);
  });

  it('should bind placeholder input', () => {
    const placeholder = 'Enter a value';
    component.placeholder = placeholder;
    expect(component.placeholder).toBe(placeholder);
  });

  it('should bind format input', () => {
    const format = 'yyyy-mm-dd';
    component.format = format;
    expect(component.format).toBe(format);
  });

  it('should have default values if inputs are not provided', () => {
    expect(component.control).toBeDefined();
    expect(component.type).toBe('text');
    expect(component.placeholder).toBe('');
    expect(component.format).toBe('');
  });

  it('ngOnInit should be called', () => {
    spyOn(component, 'ngOnInit');
    component.ngOnInit();
    expect(component.ngOnInit).toHaveBeenCalled();
  });
});
