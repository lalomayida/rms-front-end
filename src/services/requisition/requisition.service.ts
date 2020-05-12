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

export class RequisitionService {
    constructor(private http: HttpClient) { }
    private requisitionUrl = 'api/requisition-management/requisition';
    private promoteRequisitionUrl = 'api/requisition-management/promote';
    private userRequisitionsUrl = 'api/requisition-management/user-requisitions';
    private agentRequisitionsUrl = 'api/requisition-management/agent-requisitions';
    private allRequisitionsUrl = 'api/requisition-management/all-requisitions';
    private roomInformationUrl = 'api/requisition-management/requisition-information';
    private deleteRequisitionUrl = 'api/requisition-management/delete-requisition';

    getUserRequisitions(id): Observable<any> {
        return this.http.get<any>(this.userRequisitionsUrl, {
            params: {
                id: id
            }
        })
            .pipe(
                catchError(this.handleError('getUserRequisitions', []))
            );
    }

    getAgentRequisitions(id): Observable<any> {
        return this.http.get<any>(this.agentRequisitionsUrl, {
            params: {
                id: id
            }
        })
            .pipe(
                catchError(this.handleError('getAgentRequisitions', []))
            );
    }

    getAllRequisitions(): Observable<any> {
        return this.http.get<any>(this.allRequisitionsUrl)
            .pipe(
                catchError(this.handleError('getAllRequisitions', []))
            );
    }

    getRequisitionInformation(id): Observable<any> {
        return this.http.get<any>(this.roomInformationUrl, {
            params: {
                id: id
            }
        })
            .pipe(
                catchError(this.handleError('getRequisitionInformation', []))
            );
    }

    createRequisition(requisition): Observable<any> {
        return this.http.post<any>(this.requisitionUrl, requisition)
            .pipe(
                catchError(this.handleError('createRequisition', []))
            );
    }

    editRequisition(requisition): Observable<any> {
        return this.http.put<any>(this.requisitionUrl, requisition)
            .pipe(
                catchError(this.handleError('editRequisition', []))
            );
    }

    promoteRequisition(requisition): Observable<any> {
        return this.http.put<any>(this.promoteRequisitionUrl, requisition)
            .pipe(
                catchError(this.handleError('promoteRequisition', []))
            );
    }

    deleteRequisition(requisition): Observable<any> {
        return this.http.put<any>(this.deleteRequisitionUrl, requisition)
            .pipe(
                catchError(this.handleError('deleteRequisition', []))
            );
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            return of(result as T);
        }
    }
}

