import { Component } from '@angular/core';
import { CardService } from '../../services/card.service';
import { Card } from '../../models/card';

@Component({
  selector: 'app-card-search',
  templateUrl: './card-search.component.html',
  styleUrls: ['./card-search.component.scss']
})
export class CardSearchComponent {

  constructor(
    private CardService: CardService
  ) { };



  search(SearchText: string): void {
    SearchText = SearchText.toLowerCase();
    this.CardService.filteredCards = this.CardService.cards.filter((Card) => {
      return Card.title.toLowerCase().indexOf(SearchText) > -1 || (Card.name && Card.name?.toLowerCase().indexOf(SearchText) > -1);


    });

  }

}
