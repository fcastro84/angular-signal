import {Component, effect, inject, OnInit, signal} from '@angular/core';
import {CommonModule} from "@angular/common";
import {CardServiceService} from "./services/card-service.service";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule]
})
export class AppComponent {

  title = 'Bank Open';

  private cardsService = inject(CardServiceService);

  cards = this.cardsService.cards;
  cardSlots = this.cardsService.cardSlots;
  soldOut = this.cardsService.soldOut;
  lastClient = this.cardsService.lastClient;

  constructor() {
    effect(() => {
      if(this.soldOut()){
        this.title = 'Bank Closed';
      }
    })
  }

  add(holder: HTMLInputElement) {
    this.cardsService.add(holder.value);
    holder.value = '';
  }
}
