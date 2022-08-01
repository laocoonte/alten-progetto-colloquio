import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../interfaces/user.interface';

@Pipe({
  name: 'initials',
})
export class InitialsPipe implements PipeTransform {
  transform(user?: User) {
    return user == null
      ? ''
      : user.name
          .split(' ')
          .slice(0, 2)
          .map(s => s[0])
          .join(' ')
          .toUpperCase();
  }
}
