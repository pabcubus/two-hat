import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverDirective } from 'ngx-bootstrap/popover';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  modalRef: BsModalRef;

  @ViewChild('popTemplate', {static: false}) popTemplate: PopoverDirective;

  constructor(
    private modalService: BsModalService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  goToSurveys(): void {
    if (this.promptResponse() === true) {
      this.router.navigate([`/home`]);
    }
  }

  logout(): void {
    if (this.promptResponse() === true) {
      this.router.navigate([`/login`]);
    }
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  private promptResponse(): boolean {
    this.modalRef.hide();
    const conf = confirm('Estas seguro que deseas salir?');
    if (conf === true) {
      const pass = prompt('Ingresa tu contraseña');
      return (pass === '123') ? true : false;
    }
  }
}
