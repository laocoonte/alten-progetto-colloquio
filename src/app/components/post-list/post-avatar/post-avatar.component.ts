import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-post-avatar',
  templateUrl: './post-avatar.component.html',
  styleUrls: ['./post-avatar.component.scss']
})
export class PostAvatarComponent {
  @Input() user?: User;
}
