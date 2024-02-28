import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, from, Observable, ObservableInput, ReplaySubject } from 'rxjs';
import { FontNameUrl } from './FontNameUrl';
import { MemoryDb } from 'minimongo';
import { Subject } from 'rxjs/internal/Subject';

export type AxesInfo = {

}

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

  /**
   * 
   * @returns Axes based on fonts
   */
  // todo add selector as parameter
  getAxes(): Observable<AxesInfo[]> {
    const sub = new Subject<AxesInfo[]>()
    this.names.subscribe(names => {
      if (names) {
        this.db.fonts.find({ 'meta.axes': { $exists: true } }, { fields: 'meta.axes' })
          .fetch().then(docs => {
            const axes = new Map()
            for (const doc of docs) {
              for (const axe of doc.meta.axes) {
                if (!axes.has(axe.tag)) {
                  axes.set(axe.tag, { count: 0, min: 1000, max: 0 })
                }
                const axstat = axes.get(axe.tag)
                axstat.count++

                if (axe.min_value < axstat.min) {
                  axstat.min = axe.min_value
                }
                if (axe.max_value > axstat.max) {
                  axstat.max = axe.max_value
                }

              }
            }
          })
      }
    })
    return sub
  }
}

export function getUrlForFirstFont(d: FontInfo) {
  return `/assets/fonts/ofl/${d.dir}/${d.meta.fonts[0].filename}`;
}

