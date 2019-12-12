import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import * as _ from 'lodash';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  chats: Array<any> = [];

  constructor(private http: HttpClient) { 
  }

  getAllChats(): Observable<any> {
    return new Observable(obs => {
      this.http.get('../../assets/data/data.json', {responseType: 'text'}).subscribe((data: string) => {
        const jsonString: string = data.replace(/(\r\n|\n|\r)/gm, ',');
        const res: any = JSON.parse(`[${jsonString.substring(0, jsonString.length - 1)}]`);
        this.chats = res;
        
        obs.next(res);
        obs.complete();
      });
    });
  }

  processWordData(data: any): Observable<any> {
    let mostUsedWords: Array<{word: string, count: number}> = [];
    let mostActivePlayers: Array<{player: string, count: number}> = [];

    return new Observable(obs => {
      data.forEach(chat => {
        const words: Array<string> = chat.text.split(' ').filter(w => w.trim().length > 1);
        words.forEach(word => {
          const item: any = mostUsedWords.find(d => d.word.toLowerCase() === word.toLowerCase());
  
          if (item) {
            item.count++;
          } else {
            mostUsedWords.push({
              count: 1,
              word
            })
          }
        });
      });

      mostUsedWords = _.orderBy(mostUsedWords.filter(w => w.count > 10), ['count'], ['desc']);

      let playersCount = _.groupBy(data, 'player');
      mostActivePlayers = _.orderBy(Object.keys(playersCount)
                                .map(key => ({player: key, count: playersCount[key].length})), ['count'], ['desc']);

      obs.next({mostUsedWords, mostActivePlayers});
      obs.complete();
    });
  }
}
