import { Component } from '@angular/core';

@Component({
  selector: 'app-readme',
  template: `<markdown [src]="'assets/README.md'"></markdown>`,
})
export class ReadmeModalComponent {
}
