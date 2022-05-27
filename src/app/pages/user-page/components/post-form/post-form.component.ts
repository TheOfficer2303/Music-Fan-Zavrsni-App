import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent{
  @Output() post: EventEmitter<any> = new EventEmitter();

  public postForm: FormGroup = this.fb.group({
    content: ['', Validators.required],
    image: ['', Validators.required],
    imageSource: ['']
  });

  public onChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.postForm.patchValue({
        imageSource: file
      });
    }
  };

  public onSave() {
    this.post.emit(this.postForm.value);
  }

  constructor(private fb: FormBuilder) { }
}
