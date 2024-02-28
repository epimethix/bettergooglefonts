import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ClassificationService } from '../classification.service';

type Axis = {
  tag: string
  min_value: number
  max_value: number
}

@Component({
  selector: 'app-fontfilters',
  templateUrl: './fontfilters.component.html',
  styleUrls: ['./fontfilters.component.scss']
})


export class FontfiltersComponent implements OnInit {
  axes: Axis[] = []
  toggles: { name: string, items: string[] }[] = []
  fc: any;
  constructor(private http: HttpClient, private classifier: ClassificationService) { }
  ngOnInit(): void {
    this.http.get('/assets/axesmeta.json').subscribe(
      a => this.axes = (a as Axis[]).filter(a => a.tag.toLowerCase() === a.tag)
    )
    this.toggles = Object.entries( this.classifier.getAllAnswers() ).map( ([name,items]) => ({name,items})) 

    for( let toggle of this.toggles) {
      this.fc[toggle.name] = new FormControl()
    }
    

  }

}
