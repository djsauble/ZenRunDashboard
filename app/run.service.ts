import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';

import {Run} from './run';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class RunService {
  constructor(private http: Http) { }

  private runsUrl = 'https://djsauble.cloudant.com/be7b25ca3682ef8a15682f791c6110648152d7e4/_all_docs?include_docs=true'; // URL to web api

  getRuns (): Observable<Run[]> {
    return this.http.get(this.runsUrl, {
                           headers: new Headers({
                             'Authorization': 'Basic Y2tpbmFtaXN0aW9uZ2VkZW50ZXJhdHRsOjkwNDdkODRiODA4ZmU1MWI2NWZmOTQ2MjRmODBhY2Y4ZjU1ZmNkNjM=',
                             'Content-Type': 'text/json'
                           })
                        })
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  private extractData (res: Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }
    let body = res.json();
    return body.rows.map(r => r.doc) || { };
  }

  private handleError (error: any) {
    // In a real world app, we might send the error to remote logging infrastructure
    let errMsg = error.message || 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
