import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {

  cardItem={
    title:'Software Developer',
    name:'Mehmet Ali AYIK',
    phone:'0555 555 55 55',
    email:'info@mehmetaliayik.com.tr',
    adress:'Orhangazi,BURSA',

  };


  constructor() { }

  ngOnInit(): void {

  }
}
