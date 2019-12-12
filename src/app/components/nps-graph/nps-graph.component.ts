import { Component, OnInit, Input } from '@angular/core';

interface Portion {
  percent?: number;
  text?: string;
  position?: number;
}

@Component({
  selector: 'avi-nps-graph',
  templateUrl: './nps-graph.component.html',
  styleUrls: ['./nps-graph.component.scss']
})
export class NpsGraphComponent implements OnInit {

  @Input() redPortion: Portion = {};
  @Input() yellowPortion: Portion = {};
  @Input() greenPortion: Portion = {};

  constructor() { }

  ngOnInit() {
    this.redPortion.position = 0;
    this.redPortion.text = this.redPortion.text || `${this.redPortion.percent}%`;

    this.yellowPortion.position = this.redPortion.percent;
    this.yellowPortion.text = this.yellowPortion.text || `${this.yellowPortion.percent}%`;

    this.greenPortion.position = this.yellowPortion.percent + this.redPortion.percent;
    this.greenPortion.text = this.greenPortion.text || `${this.greenPortion.percent}%`;
  }

}
