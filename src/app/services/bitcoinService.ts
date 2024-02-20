import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable, of } from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators'
import { Rate } from '../models/rate.model'
@Injectable({
  providedIn: 'root',
})
export class BitcoinService {

  constructor(private http: HttpClient) { }

  private _rate$ = new BehaviorSubject<Rate>({ rate: 0 })
  public rate$ = this._rate$.asObservable()

  getRate(): Observable<number> {
    const rate = loadFromStorage('rate_db')
    if (rate !== undefined) {
      this._rate$.next(rate) // Update BehaviorSubject with the cached rate
      return of(rate)
    }
    const URL = 'https://blockchain.info/tobtc?currency=USD&value=1'
    return this.http.get<any>(URL, { responseType: 'text' as 'json' }).pipe(
      tap((fetchedRate: any) => {
        const rateValue = {rate:fetchedRate}
        this._rate$.next(rateValue)
        saveToStorage('rate_db', rateValue)
      }),
      catchError(error => {
        throw new Error('Error in getRate: ' + error)
      })
    )
  }

  getData(type: string): Observable<any> {
    // const data = loadFromStorage('data')
    // if (data) return of(data)

    const URL = `https://api.blockchain.info/charts/${type}?timespan=5months&format=json&cors=true`
    return this.http.get(URL).pipe(
      map(response => {
        console.log("response:", response)
        // const labels = response['values'].map(dataPoint => this.convertTime(dataPoint.x))
        const dataset = {
          label: 'Market Price',
          // data: response['values'].map(dataPoint => dataPoint.y),
          backgroundColor: '#f87979',
          fill: false,
        }
        return {
          // labels,
          datasets: [dataset]
        }
      }),
      catchError(error => {
        throw 'Error in getData: ' + error
      })
    )
  }

  private convertTime(timeStamp: number): string {
    const date = new Date(timeStamp * 1000)
    return date.toLocaleDateString('en-IL')
  }
}

function saveToStorage(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key: string) {
  const data = localStorage.getItem(key)
  return (data) ? JSON.parse(data) : undefined
}
