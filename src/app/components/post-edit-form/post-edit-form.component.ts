import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/models/post.model';
@Component({
  selector: 'app-post-edit-form',
  templateUrl: './post-edit-form.component.html',
  styleUrls: ['./post-edit-form.component.scss']
})
export class PostEditFormComponent implements OnInit {
  @Input() post?: Post;
  @Output() editFormData: EventEmitter<any> = new EventEmitter();

  public editForm: FormGroup = this.fb.group({
    content: ['' , Validators.required],
    image: [''],
    imageSource: ['']
  });

  public onChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.editForm.patchValue({
        imageSource: file
      });
    }
  };

  public onEdit() {
    this.editFormData.emit(this.editForm.value);
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.editForm.get('content')?.setValue(this.post?.content);
  }

}
