import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

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
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.http.get('/assets/axesmeta.json').subscribe(
      a => this.axes = (a as Axis[]).filter( a => a.tag.toLowerCase()===a.tag)
      )
  }

}
