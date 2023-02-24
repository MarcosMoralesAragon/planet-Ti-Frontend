import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { PostDialogComponent } from '../post-dialog/post-dialog.component';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {

  @Input() postInfo
  @Output() translatePostEvent = new EventEmitter()

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(){
    var dialogRef = this.dialog.open(PostDialogComponent, {
      data: this.postInfo
    });

    dialogRef.afterClosed().subscribe(r => {
      // In case of translate, the petition is sent to the dashboard component, 
      // and will be handle there
      if(r == "translate"){
        this.translatePostEvent.emit(this.postInfo)
      }
    })
  }
}
