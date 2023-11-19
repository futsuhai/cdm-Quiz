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

  // В анугуляре используется rxjs в котором одним из основных типов является Observable, он имеет большое количество плюсов по сравнению с промисами.
  // То есть, использование промисов в ангуляре очень редкий кейс. вместо этого используются observable
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


// type GET_PARAMS = {
//   [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
// };

// @Injectable({
//   providedIn: 'root'
// })
// export class RestService {
//   private _restOptionsDefault: RestOptions = {
//     isApiResponse: true,
//     hasNote: true,
//     urlPrefix: this._configState.apiUrl
//   };
//
//   constructor(
//       private _http: HttpClient,
//       private _configState: CoreConfigState
//   ) {
//   }
//
//   public restGET<T = ResponseRaw>(endpoint: string, params: GET_PARAMS = {}, options?: Omit<RestOptions, 'body'>): Observable<T> {
//     return this.request('GET', endpoint, {
//       ...options,
//       params: new HttpParams({
//         fromObject: params
//       })
//     });
//   }
//
//   public restPOST<T = ResponseRaw>(endpoint: string, body: object | null = null, options?: Omit<RestOptions, 'body'>): Observable<T> {
//     return this.request('POST', endpoint, {
//       ...options,
//       body
//     });
//   }
//
//
//
//   public restPUT<T = ResponseRaw>(endpoint: string, body: object | null = null, options?: Omit<RestOptions, 'body'>): Observable<T> {
//     return this.request('PUT', endpoint, {
//       ...options,
//       body
//     });
//   }
//
//   public restDELETE<T = ResponseRaw>(endpoint: string, body: object | null = null, options?: Omit<RestOptions, 'body'>): Observable<T> {
//     return this.request('DELETE', endpoint, {
//       ...options,
//       body
//     });
//   }
//
//
//   public request<T>(method: string, endpoint: string, options: RestOptions = this._restOptionsDefault): Observable<T> {
//     const preparedOptions = this._prepareRestOptions(options);
//
//     const context = new HttpContext();
//
//     const httpOptions: HttpOptions = {
//       ...preparedOptions,
//       context,
//     };
//
//     return this._http.request(method, preparedOptions.urlPrefix + endpoint, httpOptions);
//   }
//
//   private _prepareRestOptions(options: RestOptions = this._restOptionsDefault): RestOptions {
//     return {
//       ...options,
//       isApiResponse: options.isApiResponse ?? this._restOptionsDefault.isApiResponse,
//       hasNote: options.hasNote ?? this._restOptionsDefault.hasNote,
//       urlPrefix: options.urlPrefix ?? this._restOptionsDefault.urlPrefix,
//     };
//   }
// }
//
// export interface RestOptions extends HttpOptions {
//   isApiResponse?: boolean;
//   hasNote?: boolean;
//   urlPrefix?: string;
// }
//
// interface HttpOptions {
//   body?: any;
//   headers?: HttpHeaders | {
//     [header: string]: string | string[];
//   };
//   context?: HttpContext;
//   observe?: 'body' | 'response';
//   params?: HttpParams | {
//     [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
//   };
//   responseType?: 'json' | 'blob';
//   reportProgress?: boolean;
//   withCredentials?: boolean;
// }


// Пример использования этого сервиса в другом сервисе

// get api(): string {
//   return 'payout-requests/';
// }
//
// constructor(private _restService: RestService) {
// }
//
// // POST payout-requests
// public search(body: ISearchRequest): Observable<IPaging<IPayout>> {
//   const endpoint: string = `${this.api}`;
//
// return this._restService.restPOST(endpoint, body).pipe(
//     restMap((data) => fromResponsePaging(data, toPayout))
// );
}
