import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CardModalComponent } from './card-modal/card-modal.component';
import { CardService } from '../services/card.service';
import { Card } from '../models/card';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {

  cards!: Card[];

  constructor(
    public dialog: MatDialog,
    private CardService: CardService


  ) { }

  ngOnInit(): void {
    this.getCards();
  }

  openAddCardModel(): void {

    const dialog = this.dialog.open(CardModalComponent, { width: '400px' });

    dialog.afterClosed().subscribe(res => {
      if (res) {
        this.getCards();
      }

    })
  }

  getCards(): void {

    this.CardService.getCards()
      .subscribe((res: Card[]) => {
        console.log(res);

        this.cards = res;
      })
  }




}
