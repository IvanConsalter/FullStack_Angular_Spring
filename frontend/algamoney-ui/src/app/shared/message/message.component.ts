import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-message',
  template: `
    <small
      *ngIf="hasError()"
      class="p-error"
    >
      {{ message }}
    </small>
  `,
  styles: [],
})
export class MessageComponent {
  @Input() control?: AbstractControl | FormControl | null;
  @Input() error = '';
  @Input() message = '';

  hasError(): boolean {
    return this.control ? this.control.hasError(this.error) && this.control.dirty : true;
  }
}
