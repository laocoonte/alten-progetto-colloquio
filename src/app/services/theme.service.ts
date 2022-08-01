import { Injectable } from '@angular/core';
import { ThemeEnum } from '../enum/theme.enum';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  constructor() { }

  changeTheme(theme: ThemeEnum) {
    document.getElementsByTagName('html')[0].classList.value = 'theme-'+theme;
    localStorage.setItem('theme', theme);
  }

  getCurrentTheme() {
    return localStorage.getItem('theme') || ThemeEnum.LIGHT;
  }

  loadTheme() {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      this.changeTheme(storedTheme as ThemeEnum);
    }
  }
}
