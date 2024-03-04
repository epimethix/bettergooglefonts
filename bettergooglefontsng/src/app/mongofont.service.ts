import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, combineLatestWith, filter, from, map, Observable, ObservableInput, ReplaySubject } from 'rxjs';
import { FontNameUrl } from './FontNameUrl';
import { MemoryDb, MinimongoCollection, MinimongoLocalDb } from 'minimongo';
import { Subject } from 'rxjs/internal/Subject';
import { FilterSelection } from './fontfilters/fontfilters.component';

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

  db: MinimongoLocalDb
  filters: BehaviorSubject<FontFilter[]> = new BehaviorSubject([] as FontFilter[])
  // EventsEmitter?
  dbready: BehaviorSubject<boolean> = new BehaviorSubject(false)

  constructor(private http: HttpClient) {
    this.db = new MemoryDb();
    this.db.addCollection('fonts')
    this.db.addCollection('classification')

    this.http.get('/assets/fontmeta.json').subscribe(res => {
      this.db.collections['fonts'].upsert(res, (docs) => { console.log(docs.length); this.dbready.next(true) }, (err) => { console.log(err) })
    })

    this.http.get('/assets/classification.json').subscribe(res => {
      const cls = Object.entries(res).map(([name, items]) => ({ name, items }))
      this.db.collections['classification'].upsert(cls, (docs) => { console.log(docs.length); this.dbready.next(true) }, (err) => { console.log(err) })
    })
  }

  getFonts(filterS?: FilterSelection): Observable<FontNameUrl[]> {

    const sub = new Subject<FontNameUrl[]>()

    let selector = from([{}])
    if (filterS?.toggles) {
      selector = this.getFontNamesForSelectedToggles(filterS.toggles)
        .pipe(map(arr => ({ dir: { $in: arr } })))
    }

    this.dbready.pipe(filter<boolean>(v => v)).pipe(combineLatestWith(selector))
      .subscribe(([dbready, selector]) => {
        if (filterS?.ranges) {
          selector = { ...selector, ...this.getSelectorForAxes(filterS.ranges) }
        }
        this.db.collections['fonts'].find(selector).fetch(docs => {
          // const fmeta = docs.map()
          // TODO: map filename already in meta?
          const metafonts: FontNameUrl[] = docs.map((d: FontInfo) => ({
            name: d.meta.name,
            url: getUrlForFirstFont(d),
            axes: d.meta.axes
          }))
          sub.next(metafonts)
        }, err => console.log(err))
      })
    return sub.asObservable()
  }

  getFontNamesForSelectedToggles(toggles) {
    const sub = new Subject<string[]>()
    this.dbready.subscribe(ready => {
      if (ready) {
        const selector = {}
        for (const [name, values] of Object.entries(toggles)) {
          selector['items.' + name] = { $in: values }
        }
        this.db.collections['classification']
          .find(selector, { fields: { 'name': 1 } }).fetch().then(f => {
            sub.next(f.map(f => f.name))
            sub.complete()
          })
      }
    })
    return sub.asObservable();
  }

  getFontByName(name: string): Observable<FontInfo> {
    const sub = new Subject<FontInfo>()
    this.dbready.subscribe(ready => {
      if (ready) {
        this.db.collections['fonts'].findOne({ dir: name }).then(f => {
          sub.next(f)
        })
      }
    })

    return sub.asObservable();
  }

  getFontBySkip(selector?, options?): Observable<FontInfo> {
    const sub = new Subject<FontInfo>()
    this.dbready.subscribe(ready => {
      if (ready) {
        this.db.collections['fonts'].findOne(selector, options).then(f => {
          sub.next(f)
        })
      }
    })
    return sub.asObservable();
  }

  getSelectorForAxes(ranges: { [k in string]: { min: number, max: number } }) {
    const selector = {}
    const variationInfos = []
    for (const [param, value] of Object.entries(ranges)) {
      selector['meta.axes'] = { $elemMatch: { tag: param } } // cutting off 'a_'
      if (value) {
        const { min, max } = value
        if (min) {
          selector['meta.axes']['$elemMatch']['min_value'] = { $lte: min }
          // variationInfos.push({ name: min })
        }
        if (max) {
          selector['meta.axes']['$elemMatch']['max_value'] = { $gte: max }
          // variationInfos.push({ name: max })
        }
      }
    }
    return selector
  }


  /**
   * 
   * @returns Axes based on fonts
   */
  // todo add selector as parameter
  getAxes(): Observable<AxesInfo[]> {
    const sub = new Subject<AxesInfo[]>()
    this.dbready.subscribe(names => {
      if (names) {
        this.db.collections['fonts'].find({ 'meta.axes': { $exists: true } }, { fields: 'meta.axes' })
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

