import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false
})
export class AppComponent {
  currentPage = 0;
  pages = document.querySelectorAll('.page');

  @HostListener('window:wheel', ['$event'])
  onScroll(event: WheelEvent) {
    if (event.deltaY > 0) {
      this.nextPage();
    } else {
      this.prevPage();
    }
  }

  nextPage() {
    if (this.currentPage < this.pages.length - 1) {
      this.currentPage++;
      this.scrollToPage(this.currentPage);
    }
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.scrollToPage(this.currentPage);
    }
  }

  scrollToPage(page: number) {
    this.pages[page].scrollIntoView({ behavior: 'smooth' });
  }
}
