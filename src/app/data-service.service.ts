import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


const hostName = "https://tuned-application.herokuapp.com"

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  
 

  httpOptions = {
    headers: new HttpHeaders({ 
      'Access-Control-Allow-Origin':'*'
    })
  };

  constructor(
    private http: HttpClient
  ) { }

  addNewUser(user){
    return this.http.post(`${hostName}/api/${user.dtype}/new`, user,  this.httpOptions).pipe(
      map((response : any) => {
        return response;
        }
      ),
      catchError((error:any)=>  {
        debugger
        return of(null);
      })
      
    );
  }

  getAllUsers(userType){
    let url = `${hostName}/api/${userType}/all`;
    return this.http.get(url).pipe(
      map((response : any) => {
      
        return response;
        }
      ),
      catchError((error:any)=>  {
        debugger
        return of(null);
      })
      
    );;
  }

  getUserById(userType, userId){
    //https://tuned-application.herokuapp.com/api/artist/2
    //https://tuned-application.herokuapp.com/api/listener/find/38
    let url = `${hostName}/api/${userType}/${userId}`;
    return this.http.get(url).pipe(
      map((response : any) => {
        
        return response;
        }
      ),
      catchError((error:any)=>  {
        debugger
        return of(null);
      })
      
    );;

  }

  addNewListItem(type, userId, body ){
    let url;
    if(type === "album")
      url = `${hostName}/api/artist/${userId}/new/album`;
    else if(type === "playlist"){
      url = `${hostName}/api/listener/${userId}/playlist/new`;
    }  
    return this.http.post(url, body).pipe(
      map((response : any) => {
       
        return response;
        }
      ),
      catchError((error:any)=>  {
        debugger
        return of(null);
      })
      
    );;

  }

  addNewPlaylistForUser(playlist, userId){
   
    let url = `${hostName}/api/listener/${userId}/playlist/new`;
    return this.http.post(url, playlist).pipe(
      map((response : any) => {
        
        return response;
        }
      ),
      catchError((error:any)=>  {
        debugger
        return of(null);
      })
      
    );;
  }

  updateSongLike(userId, songId, like){
    
    let url = `${hostName}/api/listener/${userId}/likes/song/${songId}`;
    return this.http.post(url,like).pipe(
      map((response : any) => {
       
        return response;
        }
      ),
      catchError((error:any)=>  {
        debugger
        return of(null);
      })
      
    );;
  }

  updateSongDislike(userId, songId, dislike){
    
    let url = `${hostName}/api/listener/${userId}/dislikes/song/${songId}`;
    return this.http.post(url,dislike).pipe(
      map((response : any) => {
         
        return response;
        }
      ),
      catchError((error:any)=>  {
        debugger
        return of(null);
      })
      
    );;
  }

  updateSongFavorite(userId, songId, favourite){
    let url = `${hostName}/api/listener/${userId}/fav/song/${songId}`;
    return this.http.post(url,favourite).pipe(
      map((response : any) => {
        
        return response;
        }
      ),
      catchError((error:any)=>  {
        debugger
        return of(null);
      })
      
    );;
  }

  addNewComment(userId, songId, comment){
    let url = `${hostName}/api/listener/${userId}/comment/song/${songId}`;
    return this.http.post(url,comment).pipe(
      map((response : any) => {
       
        return response;
        }
      ),
      catchError((error:any)=>  {
        debugger
        return of(null);
      })
      
    );;
  }

  updateVisits(userId, songId){
    let url = `${hostName}/api/${userId}/visits/${songId}`;
    return this.http.post(url,{}).pipe(
      map((response : any) => {
    
        return response;
        }
      ),
      catchError((error:any)=>  {
        debugger
        return of(null);
      })
      
    );;
  }

  getFollowersByUserId(userId){
    let url = `${hostName}/api/user/${userId}/followers`;
    return this.http.get(url).pipe(
      map((response : any) => {
       
        return response;
        }
      ),
      catchError((error:any)=>  {
        debugger
        return of(null);
      })
      
    );;
  }

  getFollowingsByUserId(userId){
    let url = `${hostName}/api/user/${userId}/following`;
    return this.http.get(url,{}).pipe(
      map((response : any) => {
       
        return response;
        }
      ),
      catchError((error:any)=>  {
        debugger
        return of(null);
      })
      
    );;
  }

  followUser(curUser, userTofollow){
    let url = `${hostName}/api/user/${curUser}/follows/${userTofollow}`;
    return this.http.post(url,{}).pipe(
      map((response : any) => {
     
        return response;
        }
      ),
      catchError((error:any)=>  {
        debugger
        return of(null);
      })
      
    );;
  }

  unfollowUser(curUser, userTofollow){
    let url = `${hostName}/api/user/${curUser}/unfollows/${userTofollow}`;
    return this.http.post(url,{}).pipe(
      map((response : any) => {
      
        return response;
        }
      ),
      catchError((error:any)=>  {
        debugger
        return of(null);
      })
      
    );;
  }

  getSongsLikedByUser(userId){
    let url = `${hostName}/api/song/liked/by/${userId}`;
    return this.http.get(url,{}).pipe(
      map((response : any) => {
      
        return response;
        }
      ),
      catchError((error:any)=>  {
        debugger
        return of(null);
      })
      
    );;
  }

  getSongsDisLikedByUser(userId){
    let url = `${hostName}/api/song/disliked/by/${userId}`;
    return this.http.get(url,{}).pipe(
      map((response : any) => {
      
        return response;
        }
      ),
      catchError((error:any)=>  {
        debugger
        return of(null);
      })
      
    );;
  }

  getSongsFavouritesByUser(userId){
    let url = `${hostName}/api/song/favourite/by/${userId}`;
    return this.http.get(url,{}).pipe(
      map((response : any) => {
    
        return response;
        }
      ),
      catchError((error:any)=>  {
        debugger
        return of(null);
      })
      
    );;
  }



  getPlaylistById(playlistId){
    let url = `${hostName}/api/playlist/${playlistId}`;
    return this.http.get(url).pipe(
      map((response : any) => {
        
        return response;
        }
      ),
      catchError((error:any)=>  {
        debugger
        return of(null);
      })
      
    );;

  }

  getAllPlaylistsForListener(listenerId: any) {
    let url = `${hostName}/api/listener/${listenerId}/playlists/all`;
    return this.http.get(url).pipe(
      map((response : any) => {
      
        return response;
        }
      ),
      catchError((error:any)=>  {
        debugger
        return of(null);
      })
      
    );;
  }

  getAllPlaylists() {
    let url = `${hostName}/api/playlists/all`;
    return this.http.get(url).pipe(
      map((response : any) => {
       
        return response;
        }
      ),
      catchError((error:any)=>  {
        debugger
        return of(null);
      })
      
    );;
  }

  getAllAlbums(){
    let url = `${hostName}/api/album/select/all`;
    return this.http.get(url).pipe(
      map((response : any) => {
      
        return response;
        }
      ),
      catchError((error:any)=>  {
        debugger
        return of(null);
      })
      
    );;
  }

  getAllAlbumsForArtist(artistId){
    let url = `${hostName}/api/artist/${artistId}/albums/all`;
    return this.http.get(url).pipe(
      map((response : any) => {
      
        return response;
        }
      ),
      catchError((error:any)=>  {
        debugger
        return of(null);
      })
      
    );;
  }

  addSongToList(songObject){
 
    let url = `${hostName}/api/${songObject.listType}/${songObject.listId}/song/${songObject.songIdToBeAdded}`;
    return this.http.post(url, {}).pipe(
      map((response : any) => {
     
        return response;
        }
      ),
      catchError((error:any)=>  {
        debugger
        return of(null);
      })
      
    );;
  }

  removeSongFromList(songObject){
    //https://tuned-application.herokuapp.com/api/playlist/21/song/4/remove
    //https://tuned-application.herokuapp.com/api/album/23/song/16/remove
    let url = `${hostName}/api/${songObject.listType}/${songObject.listId}/song/${songObject.songId}/remove`;
    return this.http.post(url, {}).pipe(
      map((response : any) => {
       
        return response;
        }
      ),
      catchError((error:any)=>  {
        debugger
        return of(null);
      })
      
    );;
  }

  removeList(removeObj){
    
    let url = `${hostName}/api/${removeObj.userType}/${removeObj.userId}/${removeObj.listType}/${removeObj.listId}/remove`;
    return this.http.post(url, {}).pipe(
      map((response : any) => {
   
        return response;
        }
      ),
      catchError((error:any)=>  {
        debugger
        return of(null);
      })
      
    );;
  }


  search(search){
    debugger
    let url =  `${hostName}/api/${search.searchType}/search/${search.searchValue}`
    return this.http.get(url).pipe(
      map((response : any) => {
     
        return response;
        }
      ),
      catchError((error:any)=>  {
        debugger
        return of(null);
      })
      
    );
  }
}
