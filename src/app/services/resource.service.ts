import { HttpClient } from '@angular/common/http';
import { Injectable, resource } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  constructor(public http:HttpClient) { }

  getUsers(query: string): Observable<any> {
    return this.http.get(`https://dummyjson.com/users/search?q=${query}`);
  }

  fnResource(obj: any){
    resource({
     loader: () => obj.loaderFn,
    //  request: (req: any) => obj.requestFn(req),
    //  update: (res : any) => obj.updateFn(res),
    //  error: (err: any) => obj.errorFn(err)
  })
}

}
