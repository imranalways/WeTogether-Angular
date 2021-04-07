import { Component, OnInit } from '@angular/core';
import { PostsService } from '../shared/posts.service';

@Component({
  selector: 'app-image-view',
  templateUrl: './image-view.component.html',
  styleUrls: ['./image-view.component.css']
})
export class ImageViewComponent implements OnInit {

  constructor(public service:PostsService) { }
  attachment:any=localStorage.getItem('Attachment');
  ngOnInit(): void {
   
  }
  viewImage(){
    //window.open(this.attachment, "_blank");
  }
}
