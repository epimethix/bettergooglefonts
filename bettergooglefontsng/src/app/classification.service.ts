import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs';

const LOCALSTORAGE_PREFIX = 'fontquestionnaire_'

// TODO: Common? Specific for Serif?
// naaa... too complex.. could make sense but let's stick to one type of question so far
// TODO: separate description and key 
export const fontParamsSans = {
  "e-angle": { a: ["horizontal", "~horizontal", "angled", "~vertical", "vertical", "other"], s: "ea", c:"lower case e Angle" },
  "g-shape": { a: ["modern (single story)", "classical (double story)", "both", "other"], s: "g", c:"lower case g shape" },
  "l-shape": { a: ["helvetica", "akkurat", "mono", "other"], s: "l", c: "lower case l shape" },
  "ij-dot-shape": { a: ["square", "round", "other"], s: "ij", c: "dot shape of lower case i & j" },
  "Kk-shape": { a: ["helvetica", "univers", "other"], s: "K k", c: "shape of upper and lower case k / K" },
  "a-shape": { a: ["double story", "double story extensive tail", "single story", "other"], s: "a", c: "shape of lower case a" },
  "g-up-shape": { a: ["Helvetica", "Univers", "Other"], s: "G", c: "shape of uppercase G" },
  "R-shape": { a: ["curved", "straight"], s: "R", c: "shape of uppercase R" },
  "M-tip": { a: ["baseline", "above"], s: "M", c: "position of tip of uppercase M" },
  "M-stems": { a: ["parallel", "angled"], s: "M", c: "angle of outer stems of uppercase M" },
  "W-tip": { a: ["one tip", "crossed", "other"], s: "W", c: "shape of uppercase w tip" },
  "W-tip-level": { a: ["capheight", "below", "other"], s: "W", c: "position of uppercase W tip" },
  "AMW-joints": { a: ["flat", "sharp", "other"], s: "WAM",c:  "shape of outer joins of uppercase A / W / M"},
  "x-height": { a: ["neutra", "reasonable"], s: "EAR\nae", c: "x height and center of uppercase A" },
  "coarse-classification": {a: ["sans", "serif", "slab-serif", "handwriting", "script", "mono"], s: "sAp", c: "General Classification"}

}
const fontQuestions = Object.entries(fontParamsSans)
  .map(([title, value]) => ({ title, items: value.a, samples: value.s }));


export type FontQuestion = {
  title: string;
  items: string[];
  samples: string;
};

@Injectable({
  providedIn: 'root'
})
export class ClassificationService {


  private _http = inject(HttpClient)
  importIntoLocalStorage() {
    return this._http.get('assets/classification.json')
      .pipe(
        // @ts-ignore
        map(e => { e.forEach(([f, qa]) => this.saveAllAnswers(f, qa)); return e.length }))
  }
  getQuestions(): FontQuestion[] {
    return JSON.parse(JSON.stringify(this.questions))
  }
  questions: FontQuestion[] = [];
  constructor() {
    this.questions = fontQuestions
  }

  private getLocalStorageItem(fontName: string) {
    return localStorage.getItem(this.storageKey(fontName));
  }

  private storageKey(fontName: string): string {
    return LOCALSTORAGE_PREFIX + fontName;
  }


  /**
   * 
   * Overwrites local storage entry
   * @param fontName 
   * @param question 
   * @param answer 
   */
  // todo: remove this, no need for explicit 3 param method
  saveAnswer(fontName: string, question: string, answer: string) {
    this.saveAllAnswers(fontName, { [question]: answer })
  }

  saveAllAnswers(fontName: string, qa: { [question: string]: string }) {
    const answers_str = this.getLocalStorageItem(fontName)
    let answers = {}
    if (answers_str) {
      answers = JSON.parse(answers_str)
    }
    answers = { ...answers, ...qa }
    localStorage.setItem(this.storageKey(fontName), JSON.stringify(answers))
  }

  answersFor(fontName: string) {
    const answers_str = this.getLocalStorageItem(fontName)
    if (answers_str) {
      const answers = JSON.parse(answers_str)
      return answers
    }
    return {}
  }

  getAllAnswers(): { [k: string]: { [v: string]: string } } {
    const lookup = {}
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key?.startsWith(LOCALSTORAGE_PREFIX)) {
        const fontname = key.substring(LOCALSTORAGE_PREFIX.length)
        const value = localStorage.getItem(key);
        if (value) {
          lookup[fontname] = JSON.parse(value)
        }
      }
    }
    return lookup
  }

}
