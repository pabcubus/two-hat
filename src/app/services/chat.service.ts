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
      if (!this.chats.length) {
        this.http.get('../../assets/data/data.json', {responseType: 'text'}).subscribe((data: string) => {
          const jsonString: string = data.replace(/(\r\n|\n|\r)/gm, ',');
          const res: any = JSON.parse(`[${jsonString.substring(0, jsonString.length - 1)}]`);
          this.chats = res;
          
          obs.next(res);
          obs.complete();
        });
      } else {
        obs.next(this.chats);
        obs.complete();
      }
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

      mostUsedWords = _.orderBy(mostUsedWords.filter(w => w.count > 10), ['count'], ['desc']).slice(0, 20);

      let playersCount = _.groupBy(data, 'player');
      mostActivePlayers = _.orderBy(Object.keys(playersCount)
                                .map(key => ({player: key, count: playersCount[key].length})), ['count'], ['desc'])
                                .slice(0, 20);

      obs.next({mostUsedWords, mostActivePlayers});
      obs.complete();
    });
  }

  processAmountData(data: any): Observable<any> {
    return new Observable(obs => {
      const playersAmount: number = _.uniqBy(data, 'player').length;

      obs.next({playersAmount, messagesAmount: data.length});
      obs.complete();
    });
  }
}
