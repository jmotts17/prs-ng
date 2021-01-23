import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LineItem } from '../model/line-item.class';

const URL = "http://localhost:8080/line-items";
@Injectable({
  providedIn: 'root'
})
export class LineItemService {

  constructor(private http: HttpClient) { }

  // service functions
  // get all lineItems
  getAll() : Observable<LineItem[]> {
    return this.http.get(URL+'/') as Observable<LineItem[]>;
  }

  // get lineItem by id
  getById(id) : Observable<LineItem> {
    return this.http.get(URL+'/'+id) as Observable<LineItem>;
  }

  // create lineItem
  create(lineItem: LineItem) : Observable<LineItem> {
    return this.http.post(URL+'/', lineItem) as Observable<LineItem>;
  }

  // update lineItem
  update(lineItem: LineItem) : Observable<LineItem> {
    return this.http.put(URL+'/', lineItem) as Observable<LineItem>;
  }

  // delete lineItem
  delete(id) : Observable<LineItem> {
    return this.http.delete(URL+'/'+id) as Observable<LineItem>;
  }

  // get lineItems by Request ID
  getLineItemsByRequestId(id) : Observable<LineItem[]> {
    return this.http.get(URL+'/lines-for-pr/'+id) as Observable<LineItem[]>;
  }
}
