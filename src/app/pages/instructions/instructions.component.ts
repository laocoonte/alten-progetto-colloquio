import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ReadmeModalComponent } from 'src/app/modals/readme/readme-modal.component';
import { pic, picMod1, picMod2 } from '../../../assets/exercise';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.scss']
})
export class InstructionsComponent {
  @ViewChild('readmeModal') readmeModal: TemplateRef<any>;
  pic = pic;
  picMod1 = picMod1;
  picMod2 = picMod2;
  constructor(
    private ngxSmartModalService: NgxSmartModalService
  ) {}
  openReadme() {
    this.ngxSmartModalService.create('readmeModal', ReadmeModalComponent, {customClass: 'readme-modal'}).open();
  }
}
