import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-quantity-controller',
  imports: [FormsModule],
  templateUrl: './quantity-controller.component.html',
  styleUrl: './quantity-controller.component.css'
})
export class QuantityControllerComponent {


  quantity: number = 1;
  @Output() sendQuantity = new EventEmitter<{quantity:number}>();

  incrementQuantity(): void {
    this.quantity += 1;
    this.sendQuantity.emit({quantity:this.quantity});
  }

  decrementQuantity(): void {
    if (this.quantity > 1) {
      this.quantity -= 1; 
      this.sendQuantity.emit({quantity:this.quantity});
    }
  }




}
