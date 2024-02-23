import { ResolveFn } from '@angular/router'
import { Contact } from '../models/contact.model'
import { inject } from '@angular/core'
import { ContactService } from '../services/contact.service'
import { delay } from 'rxjs'

export const contactResolver: ResolveFn<Contact> = (route, state) => {
  const contactId = route.params['contactId']
  return inject(ContactService).get(contactId).pipe(delay(100))
}
