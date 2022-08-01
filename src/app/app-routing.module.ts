import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { RoutePaths } from './enum/route-paths.enum';
import { ExcerciseComponent } from './pages/excercise/excercise.component';
import { PostsPageComponent } from './pages/excercise/posts-page/posts-page.component';
import { UserDetailComponent } from './pages/excercise/user-detail/user-detail.component';
import { InstructionsComponent } from './pages/instructions/instructions.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { SettingsComponent } from './pages/settings/settings.component';

const routes: Route[] = [
  { path: RoutePaths.INSTRUCTIONS, component: InstructionsComponent },
  {
    path: RoutePaths.EXCERCISE,
    component: ExcerciseComponent,
    children: [
      {
        path: '',
        component: PostsPageComponent,
      },
      {
        path: RoutePaths.USER + '/:id',
        component: UserDetailComponent,
      },
    ],
  },
  { path: RoutePaths.SETTINGS, component: SettingsComponent },
  { path: '', redirectTo: RoutePaths.INSTRUCTIONS, pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
