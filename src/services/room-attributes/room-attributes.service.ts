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

export class RoomAttributeService {
    constructor(private http: HttpClient) { }
    private getRoomAttributesUrl = 'api/room-management/attributes';

    getRoomAttributes(): Observable<any> {
        return this.http.get<any>(this.getRoomAttributesUrl)
            .pipe(
                catchError(this.handleError('getRoomAttributes', []))
            );
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            return of(result as T);
        }
    }
}

