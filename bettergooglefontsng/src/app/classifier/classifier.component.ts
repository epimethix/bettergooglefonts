import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassificationService, fontParams } from '../classification.service';
import { appendStyleTag, generateFontCss } from '../FontNameUrl';
import { FontInfo, MongofontService, getUrlForFirstFont } from '../mongofont.service';

@Component({
  selector: 'app-classifier',
  templateUrl: './classifier.component.html',
  styleUrls: ['./classifier.component.scss']
})
export class ClassifierComponent implements OnInit {
  questions: { title: string; items: string[]; }[] = [];
  font: FontInfo | undefined;
  fontPrev: FontInfo | undefined;
  fontNext: FontInfo | undefined;
  fontNameByRouting = ''
  answers: any;
  constructor(private route: ActivatedRoute, private fontService: MongofontService, private router: Router, private classifier: ClassificationService,
    private cd: ChangeDetectorRef
    ) {
    this.questions = classifier.getQuestions() 
  }
  ngOnInit(): void {
    console.log(this.route)
    this.route.params.subscribe(p => {
      this.fontNameByRouting = p['name']
      // so far probably a memoryleak -> reuse the same subject at service... but how?
      this.fontService.getFontByName(p['name']).subscribe(f => {
        this.font = f
        const url = getUrlForFirstFont(f)
        const css = generateFontCss({ name: f.meta.name, url })
        appendStyleTag(css)
        this.fontService.getFontByIdx(f.idx - 1).subscribe(f => this.fontPrev = f)
        this.fontService.getFontByIdx(f.idx + 1).subscribe(f => this.fontNext = f)
      },
        err => console.log("sad error noises", err)
      )
      this.answers = this.classifier.answersFor( p['name'] )
    })
  }

  isSelected(title: string, option: string): boolean {
    return this.answers[title] === option
  }

  saveAnswer(ev: MatRadioChange, option: string) {
    console.log(ev, option)
    this.classifier.saveAnswer(this.fontNameByRouting, option, ev.value)
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    // TODO: this should be no absolute path
    if (event.key === 'k') {
      this.router.navigateByUrl('/classify/' + this.fontPrev?.dir)
    } else if (event.key === 'j') {
      this.router.navigateByUrl('/classify/' + this.fontNext?.dir)
    }
  }

}
