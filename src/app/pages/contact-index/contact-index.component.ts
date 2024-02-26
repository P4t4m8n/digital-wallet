import { Component, OnInit, inject } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { Observable, Subscription, take } from 'rxjs';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'contact-index',
  templateUrl: './contact-index.component.html',
  styleUrl: './contact-index.component.scss'
})
export class ContactIndexComponent implements OnInit {

  contactService = inject(ContactService)

  subscription!: Subscription
  contacts$: Observable<Contact[]> = this.contactService.contacts$
  overlayVisible!: boolean
  
  ngOnInit(): void {
  }

  onRemoveContact(petId: string) {
    this.contactService.remove(petId)
      .pipe(take(1))
      .subscribe({
        error: err => console.log('err:', err),
      })


  }

}
