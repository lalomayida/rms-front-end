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

export class RoomService {
    constructor(private http: HttpClient) { }
    private roomUrl = 'api/room-management/rooms';
    private roomInformationUrl = 'api/room-management/room-information';

    getRooms(): Observable<any> {
        return this.http.get<any>(this.roomUrl)
            .pipe(
                catchError(this.handleError('getRooms', []))
            );
    }

    getRoomInformation(id): Observable<any> {
        return this.http.get<any>(this.roomInformationUrl, {
            params:{
                id:id
            }
        })
            .pipe(
                catchError(this.handleError('getUserInformation', []))
            );
    }

    createRoom(room): Observable<any> {
        return this.http.post<any>(this.roomUrl, room)
            .pipe(
                catchError(this.handleError('createRoom', []))
            );
    }

    editRoom(room): Observable<any> {
            return this.http.put<any>(this.roomUrl, room)
            .pipe(
                catchError(this.handleError('editRoom', []))
            );
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            return of(result as T);
        }
    }
}

