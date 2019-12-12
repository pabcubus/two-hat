import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  
  private titleChangesSource: Subject<string> = new Subject<string>();
  titleChanges$: Observable<string> = this.titleChangesSource.asObservable();

  setTitle(title: string): void {
    this.titleChangesSource.next(title);
  }

  constructor() { }
}
