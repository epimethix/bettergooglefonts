import { HostListener, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IndexedDb } from 'minimongo';

const LOCALSTORAGE_PREFIX = 'fontquestionnaire_'

export const fontParams = {
  "e-angle": ["horizontal", "~horizontal", "angled", "~vertical", "vertical"],
  "x-height": ["neutra", "reasonable"],
  "g-shape": ["modern (single story)", "classical (double story)"],
  "l-shape": ["helvetica", "akkurat"],
  "Kk-shape": ["helvetica/grotesk", "univers/frutiger (symmetric)", "other"],
  "a-shape": ["double story", "double story extensive tail", "single story"],
  "G-shape": ["Helvetica", "Univers"],
  "R-shape": ["helvetica/univers (curved)", "straight"],
  "M-tip": ["baseline", "above"],
  "M-stems": ["parallel", "angled"],
  "W-tip": ["on tip", "crossed"]
}


@Injectable({
  providedIn: 'root'
})
export class ClassificationService {
  getQuestions(): { title: string; items: string[]; }[] {
    return JSON.parse(JSON.stringify(this.questions))
  }
  questions: { title: string; items: string[]; }[] = [];
  constructor() {
    this.questions = Object.entries(fontParams)
      .map(([title, items]) => ({ title, items }))
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

  getAllAnswers(): {[k:string]: string[]}  {
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
