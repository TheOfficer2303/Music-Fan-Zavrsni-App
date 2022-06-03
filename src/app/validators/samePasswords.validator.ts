import { AbstractControl, ValidationErrors } from '@angular/forms';

export function samePasswordsValidator(control: AbstractControl): ValidationErrors | null {
	const password = control.get('password');
	const confirmPassword = control.get('confirmPassword');

	return password && confirmPassword && password.value === confirmPassword.value ? null : { notSame: 'Retry pls' }	
}

export function nameValidator(control: AbstractControl): ValidationErrors | null {
	const name = control.value;

	if (/^[a-zA-Z ]+$/.test(name)) {
		return null
	} else {
		return {invalidName: 'Use letters only!'}
	}
}