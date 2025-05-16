import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  QueryList,
  ViewChildren
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChildren('pageRef') pages!: QueryList<ElementRef>;

  idlePeriod = 100;
  animationDuration = 1000;
  lastAnimation = 0;
  currentPage = 0;

  ngAfterViewInit() {
    setTimeout(() => {
      this.scrollToPage(this.currentPage);
    });
  }

  @HostListener('window:wheel', ['$event'])
  onWheel(event: WheelEvent) {
    const timeNow = Date.now();

    if (timeNow - this.lastAnimation < this.idlePeriod + this.animationDuration) {
      event.preventDefault();
      return;
    }

    if (event.deltaY > 0) {
      this.goToNextPage();
    } else {
      this.goToPreviousPage();
    }

    this.lastAnimation = timeNow;
  }

  private goToNextPage() {
    if (this.currentPage < this.pages.length - 1) {
      this.currentPage++;
      this.scrollToPage(this.currentPage);
    }
  }

  private goToPreviousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.scrollToPage(this.currentPage);
    }
  }

  private scrollToPage(index: number) {
    const page = this.pages.toArray()[index];
    if (page) {
      page.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
