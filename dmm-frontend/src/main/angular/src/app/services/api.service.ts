import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, firstValueFrom, Observable, of } from 'rxjs';
import { BaseLinkedObject } from '../model/BaseLinkedObject';
import { lazyField } from '../utility/types-utility';
import { Link } from '../model/Link';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8080/dump-master-melito';

  constructor(private http: HttpClient) {}
  
  // returns the _embedded property of a HAL response for a resource
  async getCollectionResource<U extends BaseLinkedObject>(resourceURL: string, resourceName: string): Promise<U[]> {
    const response = await firstValueFrom(this.http.get<any>(resourceURL));
    if(response['_embedded'] && response['_embedded'][resourceName]) {
      return response['_embedded'][resourceName];
    }
    else throw new Error();
  }
  
  async getItemResource<U extends BaseLinkedObject>(resourceURL: string, resourceName: string, shouldFollowLinks: boolean): Promise<U | U[] | null> {
    let response
    try {
      response= await firstValueFrom(
        this.http.get<any>(resourceURL)
        .pipe(
          catchError(
            (error) => {
              console.warn(`Issues when fetching from  ${resourceURL}: ${JSON.stringify(error)}`);
              return of(null);
            }
          )
        )
      );
    }
    catch(error) {
      console.warn(`Issues when fetching from  ${resourceURL}: ${JSON.stringify(error)}`);
      return Promise.resolve(null);
    }
    if(!response) {
      return Promise.resolve(null);
    }
    // response could be a collection, holding an array of U within its '_embedded' property
    // or it could be a resource of type U
    if(response._embedded) {
      console.debug('Resource is a collection');
      if(!shouldFollowLinks) {
        return this.getCollectionValueOrEmptyArray(response, resourceName);
      }
      else {
        for (const item of this.getCollectionValueOrEmptyArray(response, resourceName) as U[]) {
          for (const [resource,link] of Object.entries(item['_links'])) {
            console.log(`key: ${resource}, value: ${link.href}`)
            if(!['self', 'parent', 'children'].includes(resource) && !resourceName.startsWith(resource)) {
              console.log(`Condition matched, fetching for ${resource}`);
              const resourceValue = await this.getItemResource<U>(link.href, resource, true);
              Object.defineProperty(
                response,
                resource,
                {
                  value: resourceValue,
                  writable : true,
                  enumerable : true,
                  configurable : true
                }
              );
            }
          }
        }
        return response;
      }
    }
    else {
      console.debug('Resource is not a collection');
      if(!shouldFollowLinks) {
        return response;
      }
      else {
        for (const [resource,link] of Object.entries(response['_links'] as Record<string, Link>)) {
          console.log(`key: ${resource}, value: ${link.href}`)
          if(!['self', 'parent', 'children'].includes(resource) && !resourceName.startsWith(resource)) {
            console.log(`Condition matched, fetching for ${resource}`);
            const resourceValue = await this.getItemResource<U>(link.href, resource, true);
            Object.defineProperty(
              response,
              resource,
              {
                value: resourceValue,
                writable : true,
                enumerable : true,
                configurable : true
              }
            );
          }
        }
        return response;
      }
    }
  }

  getCollectionValueOrEmptyArray<U extends BaseLinkedObject>(response : any, desiredResource  :string) : U[] {
    if(response._embedded && response._embedded[desiredResource]) {
      return response._embedded[desiredResource];
    }
    else {
      //console.warn(`Could not find resource${desiredResource} in response ${JSON.stringify(response)}`);
      return [];
    }
  }
}
