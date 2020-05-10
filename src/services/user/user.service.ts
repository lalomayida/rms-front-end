import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators';

const restOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

@Injectable({ providedIn: 'root' })

export class UserService {
    constructor(private http: HttpClient) { }
    private usersUrl = 'api/user-management/users';
    private userInformationUrl = 'api/user-management/user-information';

    getUsers(): Observable<any> {
        return this.http.get<any>(this.usersUrl)
            .pipe(
                catchError(this.handleError('getUsers', []))
            );
    }

    getUserInformation(id): Observable<any> {
        return this.http.get<any>(this.userInformationUrl, {
            params:{
                id:id
            }
        })
            .pipe(
                catchError(this.handleError('getUserInformation', []))
            );
    }

    createUser(user): Observable<any> {
        return this.http.post<any>(this.usersUrl, user)
            .pipe(
                catchError(this.handleError('createUser', []))
            );
    }

    editUser(user): Observable<any> {
        return this.http.put<any>(this.usersUrl, user)
            .pipe(
                catchError(this.handleError('editUser', []))
            );
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            return of(result as T);
        }
    }
}

