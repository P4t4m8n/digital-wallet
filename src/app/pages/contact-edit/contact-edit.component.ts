import { Component, ElementRef, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, filter, fromEvent, map, takeUntil } from 'rxjs';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';
import { FormBuilder, FormGroup } from '@angular/forms';



@Component({
  selector: 'contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrl: './contact-edit.component.scss',

})

export class ContactEditComponent implements OnInit, OnDestroy {

  destroySubject$ = new Subject()

  fb = inject(FormBuilder)
  router = inject(Router)
  route = inject(ActivatedRoute)
  contactService = inject(ContactService)
  elRef = inject(ElementRef)

  contact = this.contactService.getEmptyContact()
  form!: FormGroup

  ngOnInit(): void {

    this.route.data
      .pipe(map(data => data['contact']), filter(contact => contact))
      .subscribe(contact => this.contact = contact)

    this.form = this.fb.group({
      name: [this.contact.name],
      email: [this.contact.email],
      phone: [this.contact.phone]
    })

    fromEvent(document, 'click')
      .pipe(filter(event => !this.elRef.nativeElement.contains(event.target)), takeUntil(this.destroySubject$))
      .subscribe(() => this.onBack())
  }

  onSaveContact() {
    this.contactService.save({ ...this.form.value as Contact, _id: this.contact._id || '' })
      .pipe(takeUntil(this.destroySubject$))
      .subscribe({
        next: this.onBack, error: (err => console.log('err', err))
      })
  }

  onBack = () => {
    this.router.navigateByUrl('/contacts')
  }

  ngOnDestroy(): void {
    this.destroySubject$.next(null)
    this.destroySubject$.complete()
  }
}
