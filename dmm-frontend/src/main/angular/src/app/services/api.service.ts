import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8080/dump-master-melito';

  constructor(private http: HttpClient) {}

  /**
   * Get a resource from the given endpoint (relative to the base API URL).
   * @param resourcePath The resource path relative to the API base URL.
   * @returns Observable<any> Observable with the resource data.
   */
  getResource(resourcePath: string): Observable<any> {
    const url = `${this.apiUrl}/${resourcePath}`;
    return this.http.get<any>(url);
  }

  /**
   * Follow a HATEOAS link from a HAL response.
   * This function assumes that the `link` is a fully qualified URL.
   * @param link The URL to follow (usually from `_links` in a HAL response).
   * @returns Observable<any> Observable with the linked resource data.
   */
  followLink(link: string): Observable<any> {
    return this.http.get<any>(link);
  }
}
