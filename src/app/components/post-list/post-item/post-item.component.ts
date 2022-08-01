import { Component, Input, OnInit, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { RoutePaths } from 'src/app/enum/route-paths.enum';
import { Post } from 'src/app/interfaces/post.interface';
import { User } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss']
})
export class PostItemComponent implements OnInit {
  @Input() post: Post;
  @Output() delete: EventEmitter<undefined> = new EventEmitter();
  @ViewChild('userDetail') userDetail: TemplateRef<any>;
  user: User;
  subs: Subscription[] = [];
  paths = RoutePaths;
  constructor(private userService: UserService,
    private ngxSmartModalService: NgxSmartModalService,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(isListening = false) {
    const userSub = this.userService.selectUser(this.post.userId)
      .subscribe(user => {
        if ((user as User)?.id != null) {
          this.user = user as User;
        } else if (!isListening) {
          this.listenToUpdate();
        }
      })
    this.subs.push(userSub);
  }

  listenToUpdate() {
    const sub = this.userService.userUpdated.subscribe(id => {
      if (id === this.post.userId) {
        this.getUser(true);
      }
    })
    this.subs.push(sub);
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  openPost() {
    if (!this.user) {
      this.toastrService.warning('Informazioni utente non ancora caricate');
    } else {
      this.ngxSmartModalService.create('postDetail', this.userDetail).open();
    }
  }

}
