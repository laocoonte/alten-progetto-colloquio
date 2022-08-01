import { Component, Input } from "@angular/core";

@Component({
  selector: 'app-user-detail-entry',
  template: `
    <div class="key">
      <strong>
        {{entry.key | translateuserprop | titlecase}}
      </strong>
    </div>
    <div>{{entry.value}}</div>
  `,
  styles: [`
    :host {
      display: flex; 
    }
    :host .key {
      width: 120px;
    }
    :host div {
      font-size: 18px;
      line-height: 30px;
    }
  `]
})
export class UserDetailEntryComponent {
  @Input() entry: {key: string, value: any};
}