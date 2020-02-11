import { MessageService } from './message.service';
import { HEROES } from './mock-heros';
import { IHero } from './IHero';
import { Injectable } from '@angular/core';
import { Observable, of, noop } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class HeroService {

  constructor(
    private messageService: MessageService,
    private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  //-----------------------------------------------------
  private heroesUrl = 'http://localhost:8080/getallheroes';  // URL to web api
  getHeroes() {
    debugger;
    //this.messageService.add('HeroService: fetched heroes');
    //what is of(Heroes)
    //what is tap and pipe ?
    // return this.http.get<IHero[]>(this.heroesUrl)
    // .pipe(
    //   tap(_ => this.log('fetched heroes')),
    //   catchError(this.handleError<IHero[]>('getHeroes', []))
    // );\
    var httpHeaders:HttpHeaders=new HttpHeaders();
    // http://localhost:8080/getAllHeroes
    //httpHeaders.append('Content-Type','application/json');
    console.log(this.http)
    return this.http.get('http://localhost:8080/getallheroes');
  }

  getHero(id: number): Observable<IHero> {
    // TODO: send the message _after_ fetching the hero
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<IHero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<IHero>(`getHero id=${id}`))
    );
  }
  
  //What is going on here ??
  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
    };
  }

  /** PUT: update the hero on the server */
  updateHero (hero: IHero): Observable<any> {
  return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
    tap(_ => this.log(`updated hero id=${hero.id}`)),
    catchError(this.handleError<any>('updateHero'))
  );
}

/** POST: add a new hero to the server */
addHero (hero: IHero): Observable<IHero> {
  return this.http.post<IHero>(this.heroesUrl, hero, this.httpOptions).pipe(
    tap((newHero: IHero) => this.log(`added hero w/ id=${newHero.id}`)),
    catchError(this.handleError<IHero>('addHero'))
  );
}
}