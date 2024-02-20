import { Component, OnInit, inject } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { Observable, Subscription } from 'rxjs';
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

  ngOnInit(): void {
      console.log(this.contacts$)
  }

}
