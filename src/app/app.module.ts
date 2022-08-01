import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InstructionsComponent } from './pages/instructions/instructions.component';
import { ExcerciseComponent } from './pages/excercise/excercise.component';
import { AppRoutingModule } from './app-routing.module';
import { MenuComponent } from './components/menu/menu.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { ReadmeModalComponent } from './modals/readme/readme-modal.component';
import { MarkdownModule } from 'ngx-markdown';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostAvatarComponent } from './components/post-list/post-avatar/post-avatar.component';
import { PostItemComponent } from './components/post-list/post-item/post-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ExceptionInterceptor } from './interceptors/exception.interceptor';
import { InitialsPipe } from './pipes/initials.pipe';
import { UserDetailComponent } from './pages/excercise/user-detail/user-detail.component';
import { PostsPageComponent } from './pages/excercise/posts-page/posts-page.component';
import { LoaderComponent } from './components/loader/loader.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { CardComponent } from './components/card/card.component';
import { UserDetailEntryComponent } from './pages/excercise/user-detail/user-detail-entry.component';
import { TranslateUserProp } from './pipes/translate-user-prop-pipe';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgxSmartModalModule.forRoot(),
    MarkdownModule.forRoot(),
    ToastrModule.forRoot(),
    ReactiveFormsModule,
  ],
  declarations: [
    AppComponent,
    InstructionsComponent,
    ExcerciseComponent,
    MenuComponent,
    NotFoundComponent,
    ReadmeModalComponent,
    PostListComponent,
    PostAvatarComponent,
    PostItemComponent,
    InitialsPipe,
    UserDetailComponent,
    PostsPageComponent,
    LoaderComponent,
    SettingsComponent,
    CardComponent,
    UserDetailEntryComponent,
    TranslateUserProp
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ExceptionInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
