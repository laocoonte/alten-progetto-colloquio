import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private themeService: ThemeService, private title: Title) {
    this.themeService.loadTheme();
    this.title.setTitle('Alten - Esercizio colloquio')
  }
}
