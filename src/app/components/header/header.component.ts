import { Component, OnInit, Input } from '@angular/core';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'eva-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  title: string = '';

  constructor(
    private uiService: UiService
  ) { }

  ngOnInit() {
    this.uiService.titleChanges$.subscribe(res => {
      this.title = res;
    });
  }

}
