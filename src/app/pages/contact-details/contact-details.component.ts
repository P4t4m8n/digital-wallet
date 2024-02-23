import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Contact } from '../../models/contact.model'
import { ContactService } from '../../services/contact.service'
import { Observable, switchMap } from 'rxjs'

@Component({
  selector: 'contact-details',
  templateUrl: './contact-details.component.html',
  styleUrl: './contact-details.component.scss'
})
export class ContactDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private contactService: ContactService) { }

  contact$: Observable<Contact> | null = null

  ngOnInit(): void {

    this.contact$ = this.route.params.pipe(
      switchMap(params =>
        this.contactService.get(params['contactId'])
      )
    )
   
  }
}
