import { Component, ElementRef, HostListener, OnDestroy, OnInit, inject } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Subject, filter, map, takeUntil } from 'rxjs'
import { ContactService } from '../../services/contact.service'
import { Contact } from '../../models/contact.model'
import { FormBuilder, FormGroup } from '@angular/forms'

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
  isInitialized = false

  ngOnInit(): void {
    console.log()
    this.route.data
      .pipe(map(data => data['contact']), filter(contact => contact))
      .subscribe(contact => {
        this.contact = contact
      })

    this.form = this.fb.group({
      name: [this.contact.name],
      email: [this.contact.email],
      phone: [this.contact.phone],
    })

    setTimeout(() => {
      this.isInitialized = true;
    }, 0)

  }

  onSaveContact() {
    if (this.contact.id) this.form.value.id = this.contact.id
    this.contactService.save({ ...this.form.value as Contact })
      .pipe(takeUntil(this.destroySubject$))
      .subscribe({
        next: this.onBack, error: (err => console.log('err', err))
      })
  }

  onBack = () => {
    this.router.navigateByUrl('/contacts')
  }

  @HostListener('document:click', ['$event'])
  handleDocumentClick(event: MouseEvent) {
    if (!this.isInitialized) return
    if (!this.elRef.nativeElement.contains(event.target)) {
      this.onBack()
    }
  }

  ngOnDestroy(): void {
    this.destroySubject$.next(null)
    this.destroySubject$.complete()
  }
}
