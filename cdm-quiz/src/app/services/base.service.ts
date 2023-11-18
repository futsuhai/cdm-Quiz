import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(
    protected http: HttpClient,
    protected zone: NgZone
  ) { }

  protected put(url: string, body: any, silent?: boolean, full: boolean = false): Promise<any> {
    return this.subscribe(this.http.put(url, body), url, silent, full);
  }

  protected post(url: string, body: any, silent?: boolean, full: boolean = false): Promise<any> {
    return this.subscribe(this.http.post(url, body), url, silent, full);
  }

  protected get(url: string, silent?: boolean, full: boolean = false): Promise<any> {
    return this.subscribe(this.http.get(url), url, silent, full);
  }

  protected delete(url: string, silent?: boolean, full: boolean = false): Promise<any> {
    return this.subscribe(this.http.delete(url), url, silent, full);
  }


  protected subscribe(observable: Observable<object>, url: string, silent?: boolean, full: boolean = false): Promise<any> {
    const promise = new Promise((resolve, reject) => {
      observable.subscribe({
        next: (r: any) => {
          setTimeout(() => {
            this.zone.run(() => {
              resolve(r);
            });
          });
        },
        error: r => {
          if (silent) {
            if (r.status === 500) {
              resolve({ code: "500" });
            } else {
              resolve(r.error || null);
            }
          } else {
            switch (r.status) {
              case 400 || 403: {
                resolve(null);
                break;
              }
              case 401: {
                reject(r);
                break;
              }
              default: {
                resolve(r.error || null);
              }
            }
          }
        }
      });
    });

    return promise;
  }
}
