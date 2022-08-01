import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { RoutePaths } from 'src/app/enum/route-paths.enum';
import { MenuRoute } from 'src/app/interfaces/menu-route.interface';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  activeUrl: string;
  routes: MenuRoute[] = [
    {path: '/' + RoutePaths.INSTRUCTIONS, label: 'Istruzioni'},
    {path: '/' + RoutePaths.EXCERCISE, label: 'Esercizio'},
    {path: '/' + RoutePaths.SETTINGS, label: 'Impostazioni'}
  ]
  constructor(private router: Router) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.activeUrl = event.url
      }
    })
  }
}

