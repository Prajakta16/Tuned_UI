import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

//const hostName = "http://localhost:8080";//
const hostName =   "https://tuned-application.herokuapp.com"

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  
 

  httpOptions = {
    headers: new HttpHeaders({ 
      'Access-Control-Allow-Origin':'*',
      'content-type' : "application/json"
    })
  };

  constructor(
    private http: HttpClient
  ) { }

  convertMS(ms) {
    if(ms){
      var d, h, m, s;
      s = Math.floor(ms / 1000);
      m = Math.floor(s / 60);
      s = s % 60;
      h = Math.floor(m / 60);
      m = m % 60;
      d = Math.floor(h / 24);
      h = h % 24;
      h += d * 24;
      let min = m > 9 ? m : `0${m}`;
      let sec = s > 9 ? s : `0${s}`;
      return  min + ':' + sec;
    }

    else{
      return "00:00";
    }
    
}

  addNewUser(user){
    return this.http.post(`${hostName}/api/${user.user_type}/new`, user,  this.httpOptions).pipe(
      map((response : any) => {
        return response;
        }
      ),
      catchError((error:any)=>  {
        console.log(error)
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
        console.log(error)
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
        console.log(error)
        return of(null);
      })
      
    );;

  }

  findAlbumForSong(songId){
    let url = `${hostName}/api/song/${songId}/album`;
    return this.http.get(url).pipe(
      map((response : any) => {
       
        return response;
        }
      ),
      catchError((error:any)=>  {
        console.log(error)
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
        console.log(error)
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
        console.log(error)
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
        console.log(error)
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
        console.log(error)
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
        console.log(error)
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
        console.log(error);
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
        console.log(error);
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
        console.log(error);
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
        console.log(error);
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
        console.log(error);
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
        console.log(error);
        return of(null);
      })
      
    );;
  }

  getAllSongs(){
    let url = `${hostName}/api/song/all`;
    return this.http.get(url,{}).pipe(
      map((response : any) => {
      
        return response;
        }
      ),
      catchError((error:any)=>  {
        console.log(error);
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
        console.log(error);
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
        console.log(error);
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
        console.log(error);
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
        console.log(error);
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
        console.log(error);
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
        console.log(error);
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
        console.log(error);
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
        console.log(error);
        return of(null);
      })
      
    );;
  }

  getAllLikedSongsForAListener(listenerId){
    //https://tuned-application.herokuapp.com/api/song/liked/by/38
    let url = `${hostName}/api/song/liked/by/${listenerId}`;
    return this.http.get(url).pipe(
      map((response : any) => {
      
        return response;
        }
      ),
      catchError((error:any)=>  {
        console.log(error);
        return of(null);
      })
      
    );;
  }

  getAllDislikedSongsForAListener(listenerId){
    //https://tuned-application.herokuapp.com/api/song/liked/by/38
    let url = `${hostName}/api/song/disliked/by/${listenerId}`;
    return this.http.get(url).pipe(
      map((response : any) => {
      
        return response;
        }
      ),
      catchError((error:any)=>  {
        console.log(error);
        return of(null);
      })
      
    );;
  }

  getAllFavoriteSongsForAListener(listenerId){
    //https://tuned-application.herokuapp.com/api/song/liked/by/38
    let url = `${hostName}/api/song/favourite/by/${listenerId}`;
    return this.http.get(url).pipe(
      map((response : any) => {
      
        return response;
        }
      ),
      catchError((error:any)=>  {
        console.log(error);
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
        console.log(error);
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
        console.log(error)
        return of(null);
      })
      
    );;
  }

  deleteSongById(songId){
    let url = `${hostName}/api/song/delete/${songId}`;
    return this.http.delete(url).pipe(
      map((response : any) => {
   
        return response;
        }
      ),
      catchError((error:any)=>  {
        console.log(error)
        return of(null);
      })
      
    );
  }

  deleteListById(listType, listId){
    //https://tuned-application.herokuapp.com/api/album/delete/132
    //https://tuned-application.herokuapp.com//api/playlist/delete/40
    let url = `${hostName}/api/${listType}/delete/${listId}`;
    return this.http.delete(url).pipe(
      map((response : any) => {
   
        return response;
        }
      ),
      catchError((error:any)=>  {
        console.log(error)
        return of(null);
      })
      
    );;
  }

  deleteUserById(user_id) {
   
    let url = `${hostName}/api/user/delete/${user_id}`;
    return this.http.delete(url, {}).pipe(
      map((response : any) => {
   
        return response;
        }
      ),
      catchError((error:any)=>  {
        console.log(error)
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
        console.log(error)
        return of(null);
      })
      
    );;
  }


  search(search){
    
    let url =  `${hostName}/api/${search.searchType}/search/${search.searchValue}`
    return this.http.get(url).pipe(
      map((response : any) => {
     
        return response;
        }
      ),
      catchError((error:any)=>  {
        console.log(error)
        return of(null);
      })
      
    );
  }

  addNewSongToAlbum(albumId,song){
  //  https://tuned-application.herokuapp.com/api/album/11/new/song/
 
    let url =`${hostName}/api/album/${albumId}/new/song`;
    delete song.albumId;
    return this.http.post(url, JSON.stringify(song), this.httpOptions).pipe(
      map((response : any) => {
     
        return response;
        }
      ),
      catchError((error:any)=>  {
        console.log(error)
        return of(null);
      })
      
    );
  }

  updateProfile(userId, profile){
    
    let url =`${hostName}/api/user/${userId}/profile`;
    return this.http.post(url, profile).pipe(
      map((response : any) => {
     
        return response;
        }
      ),
      catchError((error:any)=>  {
        console.log(error)
        return of(null);
      })
      
    );
  }
}
