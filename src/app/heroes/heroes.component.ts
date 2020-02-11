import { MessageService } from './../message.service';
import { HeroService } from './../hero.service';
import { IHero } from './../IHero';
import { Component, OnInit } from '@angular/core';
import { HEROES } from '../mock-heros';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {
  //It is called as a property, variables are declared inside functions
  //public hero: string = "Captain Marvel";  //type annotation is string
  hero: IHero[];
  constructor(private heroService: HeroService/*, private messageService: MessageService*/) { }
  // hero: IHero[] = HEROES;
  //selectedHero: IHero;

  getHeroes(): void{
    this.heroService.getHeroes()
      //.subscribe(h => this.hero = h);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as IHero)
      .subscribe(hero => {
        this.hero.push(hero);
      });
  }

  ngOnInit() { //Difference between contructor and ngOninit is that, function has a return type and it does not
    this.getHeroes();
  }
}