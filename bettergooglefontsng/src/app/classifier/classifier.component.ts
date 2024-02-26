import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { appendStyleTag, generateFontCss } from '../FontNameUrl';
import { FontInfo, MongofontService, getUrlForFirstFont } from '../mongofont.service';

@Component({
  selector: 'app-classifier',
  templateUrl: './classifier.component.html',
  styleUrls: ['./classifier.component.scss']
})
export class ClassifierComponent implements OnInit {
  font: FontInfo | undefined;
  fontPrev: FontInfo | undefined;
  fontNext: FontInfo | undefined;
  constructor(private route: ActivatedRoute, private fontService: MongofontService) { }
  ngOnInit(): void {
    console.log(this.route)
    this.route.params.subscribe(p => {
      // so far probably a memoryleak -> reuse the same subject at service... but how?
      this.fontService.getFontByName(p['name']).subscribe(f => {
        this.font = f
        const url = getUrlForFirstFont(f)
        const css = generateFontCss({name: f.meta.name, url})
        appendStyleTag(css)
        this.fontService.getFontByIdx(f.idx-1).subscribe( f => this.fontPrev = f )
        this.fontService.getFontByIdx(f.idx+1).subscribe( f => this.fontNext = f )
      },
      err => console.log("sad error noises", err)
      )
    })
  }
}
