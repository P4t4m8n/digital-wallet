import { Component, ElementRef, OnDestroy, OnInit, inject } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { ContactService } from '../../services/contact.service'
import { Subject, Subscription, filter, fromEvent, map, takeUntil } from 'rxjs'

@Component({
  selector: 'contact-details',
  templateUrl: './contact-details.component.html',
  styleUrl: './contact-details.component.scss'
})
export class ContactDetailsComponent implements OnInit, OnDestroy {


  route = inject(ActivatedRoute)
  router = inject(Router)
  contactService = inject(ContactService)
  elRef = inject(ElementRef)

  destroySubject$ = new Subject<void>()
  subscription!: Subscription


  contact$ = this.route.data.pipe(map(data => data['contact']))

  ngOnInit(): void {

    fromEvent(document, 'click')
      .pipe(filter(event => !this.elRef.nativeElement.contains(event.target)), takeUntil(this.destroySubject$))
      .subscribe(() => this.onBack())
  }

  onBack = () => {
    this.router.navigateByUrl('/contacts')
  }

  ngOnDestroy(): void {
    this.destroySubject$.next()
    this.destroySubject$.complete()
  }
}
