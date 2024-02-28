import { Component, OnInit } from '@angular/core';
import { FontNameUrl } from '../FontNameUrl';
import { MongofontService } from '../mongofont.service';

@Component({
  selector: 'app-fontoverview',
  templateUrl: './fontoverview.component.html',
  styleUrls: ['./fontoverview.component.scss']
})
export class FontoverviewComponent implements OnInit {

  constructor(private fontService: MongofontService) { }
  fonts: FontNameUrl[] = [];
  ngOnInit(): void {
    this.fontService.names.subscribe(fonts => this.fonts = fonts)
  }

}
