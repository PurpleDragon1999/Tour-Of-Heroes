import { InMemoryDbService } from 'angular-in-memory-web-api';
import { IHero } from './IHero';
import { Injectable } from '@angular/core';

//What the hell is going on here ??????????????????????????
@Injectable({
  providedIn: 'root',
})

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 11, name: 'Iron Man' },
      { id: 12, name: 'Captain America' },
      { id: 13, name: 'Captain Marvel' },
      { id: 14, name: 'Black Panther' },
      { id: 15, name: 'Black Widow' },
      { id: 16, name: 'Thor' },
      { id: 17, name: 'Hawk Eye' },
      { id: 18, name: 'Dr Strange' },
      { id: 19, name: 'Spider-Man' },
      { id: 20, name: 'Hulk' }
    ];
    return {heroes};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(heroes: IHero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
}