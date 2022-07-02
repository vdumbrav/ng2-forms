import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';

type FormType = FormGroup | FormArray | FormControl | AbstractControl;

export function markNestedTouch(form: FormType, touched: boolean): void {
  touched ? form.markAsTouched() : form.markAsUntouched();

  if (form instanceof FormGroup) {
    Object.values(form.controls).forEach((control: FormType) => {
      markNestedTouch(control, touched);
    });
  } else if (form instanceof FormArray) {
    form.controls.forEach((control: FormType) => {
      markNestedTouch(control, touched);
    });
  }
}
