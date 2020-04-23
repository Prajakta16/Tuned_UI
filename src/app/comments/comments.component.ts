import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { DataServiceService } from '../data-service.service';
import { each } from 'underscore';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit, OnChanges {

  @Input("comments") comments;
  @Input("songId") songId;
  @Input("userId") userId;
  @Input("canComment") canComment;

  @Output("updateComments") update = new EventEmitter<any>();

  newComment;
  commented = false;

  constructor(
    private dataservice : DataServiceService
  ) { 
      
  }

  ngOnChanges(changes : SimpleChanges){
    
    this.commented = false;
    this.canComment = changes.canComment;
    each(this.comments , (comment : any)=>{
      
      if(comment.userId === this.userId){
        this.commented = true;
      }
    })
  }



  ngOnInit(): void {
  }

  addNewComment(){
    let commentBody = {
      comment : this.newComment
    }
    this.dataservice.addNewComment(this.userId, this.songId, commentBody).subscribe((v : any)=>{
      if(v && v.comment){
        this.comments.push({
          comment : v.comment,
          username : v.username || "Anonymous",
          userId : v.listener_id
        });

        this.update.emit({
          comments : this.comments,
          songId : this.songId
        })
        
        this.commented = false;
      }else{
        console.log("SOME ERROR OCCURED");
      }
    });
  }
  

}
