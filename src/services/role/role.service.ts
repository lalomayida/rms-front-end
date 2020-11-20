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

export class RoleService {
    constructor(private http: HttpClient) { }
    private getRolesUrl = 'api/role-management/roles';

    getRoles(): Observable<any> {
        return this.http.get<any>(this.getRolesUrl)
            .pipe(
                catchError(this.handleError('getRoles', []))
            );
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            return of(result as T);
        }
    }
}

