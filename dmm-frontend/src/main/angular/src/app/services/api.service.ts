import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, from, map, mergeMap, Observable, of, switchMap, tap, toArray } from 'rxjs';
import { BaseLinkedObject } from '../model/BaseLinkedObject';
import { DOCUMENT } from '@angular/common';
import { Link } from '../model/Link';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient, @Inject(DOCUMENT) private document: Document) {
    this.apiUrl += this.document.querySelector('base')?.getAttribute('href') || '/';
  }
  
  // returns the _embedded property of a HAL response for a resource
  getCollectionResource<U extends BaseLinkedObject>(resourceURL: string, resourceName: string): Observable<U[]> {
    return this.http.get<any>(resourceURL).pipe(
      map(response => this.getCollectionValueOrEmptyArray(response, resourceName))
    );
  }
  
  getItemResource<U extends BaseLinkedObject>(resourceURL: string, resourceName: string, shouldFollowLinks: boolean): Observable<U | U[] | null> {
    return this.http.get<any>(resourceURL).pipe(
      catchError((error) => {
        console.warn(`Issues when fetching from ${resourceURL}: ${JSON.stringify(error)}`);
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
                    return this.getItemResource<U>(link.href, resource, true).pipe(
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
                return this.getItemResource<U>(link.href, resource, true).pipe(
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
        this.apiUrl + resourcePath,
        updatedInstance
    )
  }

  deleteResource<U extends BaseLinkedObject>(resourcePath : string, updatedInstance : U): Observable<U> {
    return this.http.delete<U>(
        this.apiUrl + resourcePath
    )
  }

  createResource<U extends BaseLinkedObject>(resourcePath : string, newInstance : U): Observable<U> {
    return this.http.post<U>(
        this.apiUrl + resourcePath,
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
