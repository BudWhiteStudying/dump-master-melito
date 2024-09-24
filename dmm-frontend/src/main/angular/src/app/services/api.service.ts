import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, from, map, mergeMap, Observable, of, switchMap, tap, toArray } from 'rxjs';
import { BaseLinkedObject } from '../model/BaseLinkedObject';
import { Link } from '../model/Link';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl : string | undefined;

  constructor(private http: HttpClient, private configService: ConfigService) {
    console.log(`${configService.configuration.server.baseHost}${configService.configuration.server.contextPath}`);
    this.apiUrl = `${configService.configuration.server.baseHost}${configService.configuration.server.contextPath}`;
  }
  
  // returns the _embedded property of a HAL response for a resource
  getCollectionResource<U extends BaseLinkedObject>(resourcePath: string, resourceName: string): Observable<U[]> {
    return this.http.get<any>(`${this.apiUrl}${resourcePath}`).pipe(
      map(response => this.getCollectionValueOrEmptyArray(response, resourceName))
    );
  }
  
  getItemResource<U extends BaseLinkedObject>(resourcePath: string, resourceName: string, shouldFollowLinks: boolean): Observable<U | U[] | null> {
    return this.http.get<any>(`${this.apiUrl}${resourcePath}`).pipe(
      catchError((error) => {
        console.warn(`Issues when fetching from ${this.apiUrl}${resourcePath}: ${JSON.stringify(error)}`);
        return of(null);
      }),
      switchMap(response => {
        if (!response) {
          return of(null);
        }
  
        // If the response is a collection (_embedded exists)
        if (response._embedded) {
          console.debug('Resource is a collection');
          const collection = this.getCollectionValueOrEmptyArray(response, resourceName);
  
          if (!shouldFollowLinks) {
            return of(collection);
          }
  
          return from(collection as U[]).pipe(
            mergeMap(item => 
              from(Object.entries(item['_links']!)).pipe(
                mergeMap(([resource, link]) => {
                  console.log(`key: ${resource}, value: ${link.href}`);
                  if (!['self', 'parent', 'children'].includes(resource) && !resourceName.startsWith(resource)) {
                    console.log(`Condition matched, fetching for ${resource}`);
                    return this.getItemResource<U>(link.href.slice(this.apiUrl?.length), resource, true).pipe(
                      tap(resourceValue => {
                        Object.defineProperty(item, resource, {
                          value: resourceValue,
                          writable: true,
                          enumerable: true,
                          configurable: true
                        });
                      })
                    );
                  }
                  return of(null);
                }),
                toArray(),
                map(() => {
                  delete (item as Partial<U>)._links;
                  return item;
                })
              )
            ),
            toArray(),
            map(() => {
              delete response._links;
              return this.getCollectionValueOrEmptyArray(response, resourceName);
            })
          );
        } 
        // If the response is a single resource
        else {
          console.debug('Resource is not a collection');
          if (!shouldFollowLinks) {
            delete response._links;
            return of(response);
          }
  
          return from(Object.entries(response['_links'] as Record<string, Link>)).pipe(
            mergeMap(([resource, link]) => {
              console.log(`key: ${resource}, value: ${link.href}`);
              if (!['self', 'parent', 'children'].includes(resource) && !resourceName.startsWith(resource)) {
                console.log(`Condition matched, fetching for ${resource}`);
                return this.getItemResource<U>(link.href.slice(this.apiUrl?.length), resource, true).pipe(
                  tap(resourceValue => {
                    Object.defineProperty(response, resource, {
                      value: resourceValue,
                      writable: true,
                      enumerable: true,
                      configurable: true
                    });
                  })
                );
              }
              return of(null);
            }),
            toArray(),
            map(() => {
              delete response._links;
              return response;
            })
          );
        }
      })
    );
  }

  getCollectionValueOrEmptyArray<U extends BaseLinkedObject>(response : any, desiredResource  :string) : U[] {
    if(response._embedded && response._embedded[desiredResource]) {
      return response._embedded[desiredResource];
    }
    else {
      console.warn(`Could not find resource ${desiredResource} in response ${JSON.stringify(response)}`);
      return [];
    }
  }

  getNumber(resourceURL : string) : Observable<number> {
    return this.http.get<number>(`${this.apiUrl}${resourceURL}`);
  }

  updateResource<U extends BaseLinkedObject>(resourcePath : string, updatedInstance : U): Observable<U> {
    return this.http.put<U>(
        `${this.apiUrl}${resourcePath}`,
        updatedInstance
    )
  }

  deleteResource<U extends BaseLinkedObject>(resourcePath : string): Observable<U> {
    return this.http.delete<U>(
        `${this.apiUrl}${resourcePath}`
    )
  }

  createResource<U extends BaseLinkedObject>(resourcePath : string, newInstance : U): Observable<U> {
    return this.http.post<U>(
        `${this.apiUrl}${resourcePath}`,
        newInstance
    )
  }

  createRelationship(resourcePath : string, relationshipName : string, owningResourceId : number, ownedResourceId : number) {
    return this.http.put(
      `${this.apiUrl}${resourcePath}/${owningResourceId}/${relationshipName}`,
      `${this.apiUrl}${resourcePath}/${ownedResourceId}`,
      {
        headers : {'Content-type' : 'text/uri-list'}
      }
    )
  }
}
