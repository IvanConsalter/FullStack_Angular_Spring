import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

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
  @Input() control: FormControl;
  @Input() error: string;
  @Input() message: string;

  hasError(): boolean {
    return this.control.hasError(this.error) && this.control.dirty;
  }
}
