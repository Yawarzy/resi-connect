import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

export interface PaginationModel {
  page: number;
  pageSize: number;
}

@Injectable({
  providedIn: 'root'
})
export abstract class BaseCrudService<T> {
  abstract baseUrl: string;

  public constructor(public http: HttpClient) {
  }

  /**
   * Fetch items from the API
   * @param success - callback function to handle the response
   * @param error - callback function to handle the error
   * @param pagination - pagination configuration
   * @param filters - filters to apply to the query
   */
  fetchItems(success?: (item: any) => void, error?: (err: any) => void, pagination?: PaginationModel, filters?: any): void {
    let params = new HttpParams();

    // Add pagination parameters to the query
    if (pagination) {
      const {pageSize, page} = pagination;
      params = params.set('page', page.toString());
      params = params.set('pageSize', pageSize.toString());
    }

    // Add filter parameters to the query
    if (filters) {
      Object.keys(filters).forEach(key => {
        if (filters[key] !== undefined) {
          params = params.set(key, filters[key]);
        }
      });
    }

    // Make the API call with the query parameters and handle the response or error accordingly using the success and error callbacks
    this.http.get<any>(this.baseUrl, {params}).subscribe(
      {
        next: (response: any) => {
          success?.(response);
        },
        error: (err: any) => {
          error?.(err);
          console.error('Error fetching items:', err)
        }
      }
    );
  }

  /**
   * Fetch a single item from the API
   * @param id - ID of the item to fetch
   * @param success - callback function to handle the response
   * @param error - callback function to handle the error
   */
  fetchItem(id: number | string, success?: (item: any) => void, error?: (err: any) => void): void {
    const url = `${this.baseUrl}/${id}`;
    this.http.get<any>(url).subscribe(
      {
        next: (response: any) => {
          success?.(response);
        },
        error: (err: any) => {
          error?.(err);
          console.error('Error fetching item:', err)
        }
      }
    );
  }

  /**
   * POST a new item to the API
   * @param item - item to POST
   * @param success - callback function to handle the response
   * @param error - callback function to handle the error
   */
  addItem(item: any, success?: (item: any) => void, error?: (err: any) => void): void {
    this.http.post<any>(this.baseUrl, item).subscribe(
      {
        next: (response: any) => {
          success?.(response);
        },
        error: (err: any) => {
          error?.(err);
          console.error('Error fetching item:', err)
        }
      }
    );
  }

  /**
   * PUT an updated item to the API
   * @param item - item to PUT
   * @param success - callback function to handle the response
   * @param error - callback function to handle the error
   */
  updateItem(item: any, success?: (item: any) => void, error?: (err: any) => void): void {
    const url = `${this.baseUrl}/${item.id}`;
    this.http.put<any>(url, item).subscribe(
      {
        next: (response: any) => {
          success?.(response);
        },
        error: (err: any) => {
          error?.(err);
          console.error('Error fetching item:', err)
        }
      }
    );
  }

  /**
   * DELETE an item from the API
   * @param id - ID of the item to DELETE
   * @param success - callback function to handle the response
   * @param error - callback function to handle the error
   */
  deleteItem(id: number | string, success?: (item: any) => void, error?: (err: any) => void): void {
    const url = `${this.baseUrl}/${id}`;
    this.http.delete<any>(url).subscribe(
      {
        next: (response: any) => {
          success?.(response);
        },
        error: (err: any) => {
          error?.(err);
          console.error('Error fetching item:', err)
        }
      }
    );
  }
}
