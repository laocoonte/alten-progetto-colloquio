import { HttpClient } from "@angular/common/http";
import { Injectable, EventEmitter } from "@angular/core";
import { environment } from "src/environment";
import { User } from "../interfaces/user.interface";
import { catchError, tap } from "rxjs/operators";
import { of, throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = environment.API.base + environment.API.users;
  private users: Map<number, User | LoadingEntity> = new Map();
  userUpdated: EventEmitter<number> = new EventEmitter();
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<User[]>(this.url);
  }

  getUser(id: number) {
    this.users.set(id, {isDownloading: true})
    return this.http.get<User>(this.url + '/' + id).pipe(
      tap(user => {
        this.users.set(id, user);
        this.userUpdated.emit(id);
      }),
      catchError(_ => {
        const user = {isDownloading: false};
        this.users.set(id, user);
        return throwError(() => user);
      })
    );
  }
  
  selectUser(id) {
    const user = this.users.get(id);
    if (!user || (user as LoadingEntity).isDownloading === false) {
      return this.getUser(id);
    } else {
      return of(user);
    }
  }
}

interface LoadingEntity {
  isDownloading: boolean;
}