import { HttpClient } from '@angular/common/http';
import { Injectable, resource, signal } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { IFormControl } from '../interface/form.interface';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  private formControlArray = signal<IFormControl[]>([]);
  constructor(public http:HttpClient) { }

  getUsers(query: string): Observable<any> {
    return this.http.get(`https://dummyjson.com/users/search?q=${query}`);
  }

  fnGetFormControlArray(): Observable<any> {
    return this.http.get('master-form.json').pipe(
      tap((res: any) => {
        this.formControlArray.set(res);
      })
    );
  }

  fnGetReturnSpecificFormControl(name: string): IFormControl {
    return this.formControlArray().find(c => c.name === name)!;
  }

  

}
