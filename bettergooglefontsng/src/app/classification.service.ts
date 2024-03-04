import { HostListener, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IndexedDb } from 'minimongo';

const LOCALSTORAGE_PREFIX = 'fontquestionnaire_'

// TODO: Common? Specific for Serif?
// naaa... too complex.. could make sense but let's stick to one type of question so far
// 
export const fontParamsSans = {
  "e-angle": { a: ["horizontal", "~horizontal", "angled", "~vertical", "vertical"], s: "ea" },
  "x-height": { a: ["neutra", "reasonable"], s: "Hx7" },
  "g-shape": { a: ["modern (single story)", "classical (double story)"], s: "g" },
  "l-shape": { a: ["helvetica", "akkurat"], s: "l" },
  "Kk-shape": { a: ["helvetica/grotesk", "univers/frutiger (symmetric)", "other"], s: "K k" },
  "a-shape": { a: ["double story", "double story extensive tail", "single story"], s: "a" },
  "G-shape": { a: ["Helvetica", "Univers"], s: "G" },
  "R-shape": { a: ["helvetica/univers (curved)", "straight"], s: "R" },
  "M-tip": { a: ["baseline", "above"], s: "M" },
  "M-stems": { a: ["parallel", "angled"], s: "M" },
  "W-tip": { a: ["one tip", "crossed", "other"], s: "W" },

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

  saveAnswer(fontName: string, question: string, answer: string) {
    const answers_str = this.getLocalStorageItem(fontName)
    let answers = {}
    if (answers_str) {
      answers = JSON.parse(answers_str)
    }
    answers[question] = answer
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

  getAllAnswers(): { [k: string]: string[] } {
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
