import { ResolveFn } from '@angular/router'
import { Contact } from '../models/contact.model'
import { inject } from '@angular/core'
import { ContactService } from '../services/contact.service'
import { of } from 'rxjs'

export const contactResolver: ResolveFn<Contact | Partial<Contact>> = (route, state) => {
  const contactId = route.params['contactId']
  console.log("contactId:", contactId)

  // if (!contactId) { return of(inject(ContactService).getEmptyContact()) }
   return inject(ContactService).get(contactId) 
}
