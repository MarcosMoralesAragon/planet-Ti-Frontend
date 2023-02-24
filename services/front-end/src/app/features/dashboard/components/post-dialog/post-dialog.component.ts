import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Post } from 'src/app/models/post';


@Component({
  selector: 'app-post-dialog',
  templateUrl: './post-dialog.component.html',
  styleUrls: ['./post-dialog.component.scss']
})
export class PostDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PostDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Post
    ) { }

  ngOnInit(): void {
    console.log(this.data)
  }

  closeDialog(){
    this.dialogRef.close("close")
  }
  addTranslation(){
    this.dialogRef.close("translate")
  }
}
