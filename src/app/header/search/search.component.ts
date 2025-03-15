import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-search',
  imports: [RouterModule,CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  @ViewChild('searchTerm') searchTerm!: ElementRef;

  constructor(private router: Router) {}

  onSearch(): void {
    let str: String = this.searchTerm.nativeElement.value;
    if (str.trim() === '') {
      this.router.navigate(['']);
    } else {
      this.router.navigate(['/products'], { queryParams: { search: str } });
    }
  }
}
