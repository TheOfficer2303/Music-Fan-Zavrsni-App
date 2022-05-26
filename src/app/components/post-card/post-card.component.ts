import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {
  public isCollapsed = false;
  @Input() post?: Post;
  @Output() comment: EventEmitter<any> = new EventEmitter()


  constructor() { }

  onComment(event: any) {
    this.comment.emit({event, postId: this.post?.id})
  }

  ngOnInit(): void {
    console.log(this.post)
  }

}
