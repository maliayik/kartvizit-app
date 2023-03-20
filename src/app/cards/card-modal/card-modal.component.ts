import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, MaxLengthValidator, Validators } from '@angular/forms';
import { CardService } from '../../services/card.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Card } from '../../models/card';

@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.scss']
})
export class CardModalComponent implements OnInit {


  cardForm!: FormGroup;

  constructor(
    private _snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<CardModalComponent>,
    private fb: FormBuilder,
    private CardService: CardService,
    @Inject(MAT_DIALOG_DATA) public data: Card
  ) { }


  ngOnInit(): void {
    console.log(this.data);

    this.cardForm = this.fb.group({
      name: [this.data?.name || '', Validators.maxLength(50)],
      title: [this.data?.title || '', [Validators.required, Validators.maxLength(255)]],
      phone: [this.data?.phone || '', [Validators.required, Validators.maxLength(20)]],
      email: [this.data?.email || '', [Validators.email, Validators.maxLength(50)]],
      address: [this.data?.address || '', Validators.maxLength(255)]
    });
  }

  addCard(): void {
    console.log(this.cardForm.value);
    this.CardService.addCard(this.cardForm.value)
      .subscribe((res: any) => {
        console.log(res);
        this._snackBar.open(res || 'kartvizit başarıyla eklendi.', '', {
          duration: 4000,
        });
        this.dialogRef.close();
        this.CardService.getCards();


      });
  }

  updateCard(): void {
    this.CardService.updateCard(this.cardForm.value, this.data.id)
      .subscribe((res: any) => {
        console.log(res);
        this._snackBar.open(res || 'kartvizit başarıyla güncellendi.', '', {
          duration: 4000,
        });

        this.dialogRef.close();
        this.CardService.getCards();
      });



  }

  deleteCard() {
    this.CardService.deleteCard(this.data.id)
    .subscribe((res:any)=>{
      
      this._snackBar.open(res || 'kartvizit başarıyla güncellendi.', '', {
        duration: 4000,
      });

      this.dialogRef.close();
      this.CardService.getCards();

    });
  }


}



