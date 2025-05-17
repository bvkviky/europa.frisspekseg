import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  QueryList,
  ViewChildren,
  OnDestroy
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnDestroy {
  @ViewChildren('pageRef') pages!: QueryList<ElementRef>;
  idlePeriod = 100;
  animationDuration = 1000;
  lastAnimation = 0;
  currentPage = 0;


  ngAfterViewInit() {
    this.showPageContent(this.currentPage);
  }

  ngOnDestroy() {
    // Nothing to clean up since we use @HostListener
  }

  @HostListener('wheel', ['$event'])
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
    event.preventDefault();
  }

  private goToNextPage() {
    if (this.currentPage < this.pages.length - 1) {
      this.togglePageContent(this.currentPage, false);
      this.currentPage++;
      this.togglePageContent(this.currentPage, true);
      this.scrollToPage(this.currentPage);
    }
  }

  private goToPreviousPage() {
    if (this.currentPage > 0) {
      this.togglePageContent(this.currentPage, false);
      this.currentPage--;
      this.togglePageContent(this.currentPage, true);
      this.scrollToPage(this.currentPage);
    }
  }

  private togglePageContent(index: number, show: boolean) {
    const page = this.pages.toArray()[index];
    if (page) {
      const content = page.nativeElement.querySelector('.page-content');
      if (content) {
        if (show) {
          content.classList.add('show');
        } else {
          content.classList.remove('show');
        }
      }
    }
  }

  private showPageContent(index: number) {
    this.pages.forEach((page, i) => {
      const content = page.nativeElement.querySelector('.page-content');
      if (content) {
        if (i === index) {
          content.classList.add('show');
        } else {
          content.classList.remove('show');
        }
      }
    });
  }

  private scrollToPage(index: number) {
    const page = this.pages.toArray()[index];
    if (page) {
      page.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
