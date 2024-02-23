import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { ContactService } from '../../services/contact.service';
import { ContactFilter } from '../../models/contact.model';

@Component({
  selector: 'contact-filter',
  templateUrl: './contact-filter.component.html',
  styleUrl: './contact-filter.component.scss'
})
export class ContactFilterComponent implements OnInit, OnDestroy {

  destroySubject$ = new Subject()
  filterSubject$ = new Subject()

  contactServie = inject(ContactService)

  filterBy!: ContactFilter
  selectedFilter: string = 'name'

  ngOnInit(): void {
    this.contactServie.contactFilter$
      .pipe(takeUntil(this.destroySubject$))
      .subscribe(filterBy => this.filterBy = filterBy)

    this.filterSubject$
      .pipe(debounceTime(1), distinctUntilChanged())
      .subscribe(() => this.contactServie.setFilter(this.filterBy))
  }

  onSetFilter(filterType: string, value: string) {
    switch (filterType) {
      case 'name':
        this.filterBy.name = value;
        break;
      case 'phone':
        this.filterBy.phone = value;
        break;
      case 'email':
        this.filterBy.email = value;
        break;
    }
    this.filterSubject$.next({ ...this.filterBy });
  }

  onFilterChange(filterType: string) {
    this.selectedFilter = filterType
  }

  ngOnDestroy(): void {
    this.destroySubject$.next(null)
    this.destroySubject$.complete()
  }

}
