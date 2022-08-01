import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, SimpleChanges  } from '@angular/core';
import { Post } from 'src/app/interfaces/post.interface';
import {
  trigger,
  style,
  animate,
  transition,
} from '@angular/animations';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
  animations: [
    trigger('fade', [ 
      transition('void => *', [
        style({ opacity: 0 }),
        animate(2000, style({opacity: 1}))
      ]) 
    ]),
  ]
})
export class PostListComponent {
  @Input() posts: Post[];
  @Input() isLoading: boolean;
  @Output() deletePost: EventEmitter<Post> = new EventEmitter();
  @Output() nextPage: EventEmitter<undefined> = new EventEmitter();
  @ViewChild('infiniteScroll') infiniteScroll: ElementRef; 
  debouncer: Subject<string> = new Subject<string>();
  subs: Subscription[] = [];
  constructor() {
    const sub = this.debouncer.pipe(debounceTime(200))
      .subscribe(() => this.nextPage.emit());
    this.subs.push(sub);
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  postById(_index: number, post: Post) {
    return post.id;
  }

  loadNextPage() {
    if (!this.isLoading && this.isInfiniteScrollOnViewport()) {
      this.debouncer.next(undefined);
    }
  }

  isInfiniteScrollOnViewport() {
    const rect = this.infiniteScroll.nativeElement .getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    ) 
  }
}
