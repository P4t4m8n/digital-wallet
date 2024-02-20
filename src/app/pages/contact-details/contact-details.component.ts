import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Contact } from '../../models/contact.model'
import { ContactService } from '../../services/contact.service'

@Component({
  selector: 'contact-details',
  templateUrl: './contact-details.component.html',
  styleUrl: './contact-details.component.scss'
})
export class ContactDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private contactService: ContactService) { }

  contact: Contact | null = null

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const contactId = params['contactId']
      if (contactId) {
        this.contactService.getContactById(contactId).subscribe({
          next: (contact) => {
            this.contact = contact
          },
          error: (error) => {
            console.error('Error fetching contact:', error)
          }
        })
      }
    })
  }

}
