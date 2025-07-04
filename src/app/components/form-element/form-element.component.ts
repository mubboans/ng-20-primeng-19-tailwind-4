import { ChangeDetectionStrategy, Component, inject, input, OnInit, OnChanges, signal, SimpleChanges } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { IFormControl, Validation } from '../../interface/form.interface';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { PasswordModule } from 'primeng/password';
import { CalendarModule } from 'primeng/calendar';
import { ResourceService } from '../../services/resource.service';
@Component({
  selector: 'app-form-element',
  imports: [ReactiveFormsModule, InputTextModule, ButtonModule, InputNumberModule, PasswordModule, CalendarModule, JsonPipe],
  templateUrl: './form-element.component.html',
  styleUrl: './form-element.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormElementComponent implements OnInit, OnChanges {
  public formControlArray = input <IFormControl[]>(); // Array of form controls
  public formBuilder = inject(FormBuilder);
  public formGroup:FormGroup = this.formBuilder.group({});
  private fullFormConfig =signal<IFormControl[]>([]);
  private resourceService = inject(ResourceService);
  ngOnInit(): void {
    
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['formControlArray'] && this.formControlArray()?.length) {
      this.fullFormConfig.set(this.formControlArray()!);
      this.createForm(this.formControlArray()!);
     }
  }
  private createForm(formArray: IFormControl[]): void {
    console.log('Creating form with controls:', formArray);
      for (const control of formArray) {
        const validators = this.buildFormValidators(control.validation);
        this.formGroup.addControl(control.name, this.formBuilder.control(control.value, validators));
      }
  }
  private buildFormValidators(validation: Validation []): any[] {
    const validators = [];
    for (const val of validation) {
      if (val.required) {
        validators.push(Validators.required);
      }
      if (val.minlength) {
        validators.push(Validators.minLength(val.minlength));
      }
      if (val.maxlength) {
        validators.push(Validators.maxLength(val.maxlength));
      }
    }
    return validators;
  }
  public submitForm(): void {
    console.log(this.formGroup.value, 'Form Submitted');
  }

  public addNextControlonEvent(event: any): void {
    const control = this.resourceService.fnGetReturnSpecificFormControl(event.target.value);
    if (control) { 
        this.addControlInForm(control);
    }
  }
  private addControlInForm(control: IFormControl): void {
    this.formGroup.addControl(control.name, this.formBuilder.control(control.value, this.buildFormValidators(control.validation)));
  }
}
