import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
  @Input()
  totalPages:number=1;
  @Input()
  currentPage:number=0;
  @Output() sendPagination = new EventEmitter<{toPage:number}>();

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1); // Create an array from 1 to totalPages
  }
  
  onPageChange(page: number): void {
    // Logic to change the current page.
    // Emit an event or call a function to notify the parent component.
    this.sendPagination.emit({toPage:(page-1)});
    console.log(`Page changed to: ${page-1}`);
  }


}
