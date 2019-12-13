import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(
    private uiService: UiService
  ) { }

  ngOnInit() {
    this.uiService.setTitle('ABOUT');
  }
}
