import {computed, Injectable, signal} from '@angular/core';
import {Card} from "../interfaces/card";

@Injectable({
  providedIn: 'root'
})
export class CardServiceService {
 cards = signal<Card[]>([
   {
     id: '1',
     holder: 'Dany',
     status: 'Active',
   },
   {
     id: '2',
     holder: 'Edgar',
     status: 'Active',
   },
 ]) ;

 cardSlots = signal<number>(3);
 lastClient = signal('No clients');
 soldOut = computed(()=> this.cardSlots() <= 0 );

  add( holder: string ){
    const card: Card = {
      id: Math.random().toFixed(),
      holder,
      status: 'pending'
    };
    this.cards.update((p) => [ ...p, card]);
    this.cardSlots.update((p) => p - 1);
    this.lastClient.set(`Thanks ${holder}!!`);
  }
}
