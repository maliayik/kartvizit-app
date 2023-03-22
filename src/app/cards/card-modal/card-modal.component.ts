import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, MaxLengthValidator, Validators } from '@angular/forms';
import { CardService } from '../../services/card.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Card } from '../../models/card';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.scss']
})
export class CardModalComponent implements OnInit {

  showSpinner: boolean = false;
  cardForm!: FormGroup;

  constructor(
    private _snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<CardModalComponent>,
    private fb: FormBuilder,
    private CardService: CardService,
    @Inject(MAT_DIALOG_DATA) public data: Card,
    private SnackbarService:SnackbarService,
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
  };

  addCard(): void {
    this.showSpinner = true;
    this.CardService.addCard(this.cardForm.value)
      .subscribe((res: any) => {
        console.log(res);
        this.getSucces(res || 'Kartvizit başarıyla eklendi.')

      },(err:any)=>{
        this.getError(err || 'Kartvizit eklenirken bir sorun oluştu')
      });
  };

  updateCard(): void {
    this.showSpinner = true;
    this.CardService.updateCard(this.cardForm.value, this.data.id)
      .subscribe((res: any) => {
        this.getSucces(res || 'Kartvizit başarıyla güncellendi')
      },(err:any)=>{
        this.getError(err || 'Kartvizit güncellenirken bir sorun oluştu')
      });
  };

  deleteCard(): void {
    this.showSpinner = true;
    this.CardService.deleteCard(this.data.id)
      .subscribe((res: any) => {
        this.getSucces(res || 'Kartvizit başarıyla silindi.')
      },(err:any)=>{
        this.getError(err || 'Kartvizit silinirken bir sorun oluştu')
      });
  };

  getSucces(message: string): void {
    this.SnackbarService.createSnackBar('succes',message);

    this.CardService.getCards();
    this.showSpinner = false;
    this.dialogRef.close();

  };

  getError(message:string):void{
    this.SnackbarService.createSnackBar('error',message);
   this.showSpinner=false;
  }


}



