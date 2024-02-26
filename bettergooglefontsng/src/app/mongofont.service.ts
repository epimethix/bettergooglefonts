import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, from, Observable, ObservableInput, ReplaySubject } from 'rxjs';
import { FontNameUrl } from './FontNameUrl';
import { MemoryDb } from 'minimongo';
import { Subject } from 'rxjs/internal/Subject';

export type FontFilter = {
  name: string
  min?: number
  max?: number
}

export type FontInfo = {
  idx: number
  dir: string
  meta: {
    name: string
    fonts: { filename: string }[]
    axes: { tag: string, min_value: number, max_value: number }[]
  }
}

@Injectable({
  providedIn: 'root'
})
export class MongofontService {
  db: any;
  filters: BehaviorSubject<FontFilter[]> = new BehaviorSubject([] as FontFilter[])
  names: BehaviorSubject<FontNameUrl[]> = new BehaviorSubject([] as FontNameUrl[])

  constructor(private http: HttpClient) {

    const LocalDb = MemoryDb;
    this.db = new LocalDb();
    this.db.addCollection('fonts')

    this.http.get('/assets/fontmeta.json').subscribe(res => {
      this.db.fonts.upsert(res, (docs) => { console.log(docs.length) }, (err) => { console.log(err) })

      this.db.fonts.find().fetch(docs => {
        // const fmeta = docs.map()

        // TODO: map filename already in meta?
        const metafonts: FontNameUrl[] = docs.map((d: FontInfo) => ({
          name: d.meta.name,
          url: getUrlForFirstFont(d),
          axes: d.meta.axes
        }))
        this.names.next(metafonts)
      })
    })
  }

  getFontByName(name: string): Observable<FontInfo> {
    const sub = new Subject<FontInfo>()
    this.names.subscribe(_ => {
      this.db.fonts.findOne({ dir: name }).then(f => {
        if (f) { sub.next(f) }
      })
    })
    return sub.asObservable();
  }
  
  getFontByIdx(idx: number): Observable<FontInfo> {
    const sub = new Subject<FontInfo>()
    this.names.subscribe(_ => {
      this.db.fonts.findOne({ idx }).then(f => {
        if (f) { sub.next(f) }
      })
    })
    return sub.asObservable();
  }


}
export function getUrlForFirstFont(d: FontInfo) {
  return `/assets/fonts/ofl/${d.dir}/${d.meta.fonts[0].filename}`;
}

