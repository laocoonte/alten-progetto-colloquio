import { KeyValuePipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
  providers: [KeyValuePipe],
})
export class UserDetailComponent implements OnInit {
  user: User;
  subs: Subscription[] = [];
  isLoading: boolean;
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private keyValue: KeyValuePipe,
    private location: Location
  ) {}

  back() {
    this.location.back();
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!Number.isInteger(id)) {
      this.toastr.error(
        'Richiesta dati utenti bloccata',
        'Id utente non valido'
      );
    } else {
      this.isLoading = true;
      this.getUser(id);
    }
  }

  getUser(id: number, isListening = false) {
    const userSub = this.userService.selectUser(id).subscribe(user => {
      if ((user as User)?.id != null) {
        this.user = user as User;
        console.log(this.keyValue.transform(user as User));
        this.isLoading = false;
      } else if (!isListening) {
        this.listenToUpdate(id);
      }
    });
    this.subs.push(userSub);
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  listenToUpdate(id: number) {
    const sub = this.userService.userUpdated.subscribe(updatedId => {
      if (updatedId === id) {
        this.getUser(id, true);
      }
    });
    this.subs.push(sub);
  }
}
