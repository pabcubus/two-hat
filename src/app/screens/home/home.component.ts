import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import * as _ from 'lodash';
import { UiService } from '../../services/ui.service';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public data: Array<any> = [];

  public barOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barLabels: Label[] = [''];
  public barType: ChartType = 'bar';
  public barLegend = true;

  public barData: ChartDataSets[] = [];

  public mostUsedWords: Array<{word: string, count: number}> = [];
  public mostActivePlayers: Array<{player: string, count: number}> = [];

  constructor(
    private uiService: UiService,
    private chatService: ChatService
  ) { }

  ngOnInit() {
    this.uiService.setTitle('DASHBOARD');
    this.setData();
  }

  private setData(): void {
    this.chatService.getAllChats().subscribe(
      (res: any) => {
        this.data = res;
        this.processData();
        this.processWordsData();
      });
  }

  private processData(): void {
    this.data.forEach(chat => {
      chat.topics.forEach(t => {
        const item: any = this.barData.find(d => d.label === String(t.topic));

        if (item) {
          item.data[0]++;
        } else {
          this.barData.push({
            data: [1], label: String(t.topic)
          })
        }
      });
    });
  }

  private processWordsData(): void {     
    this.chatService.processWordData(this.data).subscribe(
      (res: any) => {
        this.mostUsedWords = res.mostUsedWords;
        this.mostActivePlayers = res.mostActivePlayers;
      });
  }
}
