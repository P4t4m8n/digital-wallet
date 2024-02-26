import { Injectable, inject } from '@angular/core'
import { Observable, BehaviorSubject, throwError, from, tap, retry, catchError, of } from 'rxjs'
import { storageService } from './async-storage.service'
import { HttpErrorResponse } from '@angular/common/http'
import { Contact, ContactFilter } from '../models/contact.model'
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { firebaseService } from './firebase.service'

const DB_NAME = 'contact'
@Injectable({
    providedIn: 'root'
})
export class ContactService {

    //Variables

    private _contacts$ = new BehaviorSubject<Contact[]>([])
    public contacts$ = this._contacts$.asObservable()

    private _contactFilter$ = new BehaviorSubject<ContactFilter>({ name: "", phone: "", email: "" })
    public contactFilter$ = this._contactFilter$.asObservable()

    private _firestore = inject(AngularFirestore)

    //Constructor

    constructor() {
        this.initializeContacts()
        this.query()
    }

    //Public Methods

    public query() {
        return from(firebaseService.query(DB_NAME))
            .pipe(
                tap(contacts => {
                    const filterBy = this._contactFilter$.value
                    if (filterBy.name)
                        contacts = contacts.filter(contact => contact.name.toLowerCase().includes(filterBy.name.toLowerCase()))
                    if (filterBy.phone)
                        contacts = contacts.filter(contact => contact.phone.toLowerCase().includes(filterBy.phone.toLowerCase()))
                    if (filterBy.email)
                        contacts = contacts.filter(contact => contact.email.toLowerCase().includes(filterBy.email.toLowerCase()))

                    this._contacts$.next(this._sort(contacts))
                }),
                retry(1),
                catchError(this._handleError)
            )
    }

    public get(contactId: string): Observable<Contact> {
        return from(firebaseService.get<Contact>(DB_NAME, contactId))
            .pipe(catchError(err => throwError(() => `Contact id ${contactId} not found!`)))
    }

    public remove(id: string) {
        return from(firebaseService.remove(DB_NAME, id))
            .pipe(
                tap(() => {
                    let contacts = this._contacts$.value
                    contacts = contacts.filter(contact => contact.id !== id)
                    this._contacts$.next(contacts)
                }),
                retry(1),
                catchError(this._handleError)
            )
    }

    public save(contact: Contact | Partial<Contact>) {
        console.log("contact:", contact)
        return (contact.id) ? this._updateContact(contact as Contact) : this._addContact(contact)
    }

    public getEmptyContact(): Partial<Contact> {
        return {
            name: '',
            email: '',
            phone: ''
        }
    }

    public setFilter(filterBy: ContactFilter) {
        this._contactFilter$.next(filterBy)
        this.query().subscribe()
    }

    //Private Methods

    private initializeContacts() {
        this._firestore.collection<Contact>(DB_NAME).valueChanges().pipe(
            tap(contacts => {
                if (contacts.length === 0) {
                    console.log('No contacts found, initializing...');
                    this._createContacts()
                }
            }),
            catchError(error => {
                console.error('Error initializing contacts:', error);
                return of([])
            })
        ).subscribe()
    }

    private _updateContact(contact: Contact) {
        console.log("contact:", contact)
        return from(firebaseService.put<Contact>(DB_NAME, contact))
            .pipe(
                tap(updatedContact => {
                    const contacts = this._contacts$.value
                    this._contacts$.next(contacts.map(contact => contact.id === updatedContact.id ? updatedContact : contact))
                }),
                retry(1),
                catchError(this._handleError)
            )
    }

    private _addContact(contact: Partial<Contact>) {
        return from(firebaseService.post<Partial<Contact>>(DB_NAME, contact))
            .pipe(
                tap(newContact => {
                    const contacts = this._contacts$.value
                    this._contacts$.next([...contacts, newContact as Contact])
                }),
                retry(1),
                catchError(this._handleError)
            )
    }

    private _sort(contacts: Contact[]): Contact[] {
        return contacts.sort((a, b) => {
            if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) {
                return -1
            }
            if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
                return 1
            }
            return 0
        })
    }

    private _createContacts() {


        const contacts: Array<Partial<Contact>> = [
            {
                "name": "Ochoa Hyde",
                "email": "ochoahyde@renovize.com",
                "phone": "+1 (968) 593-3824"
            },
            {
                "name": "Hallie Mclean",
                "email": "halliemclean@renovize.com",
                "phone": "+1 (948) 464-2888"
            },
            {
                "name": "Parsons Norris",
                "email": "parsonsnorris@renovize.com",
                "phone": "+1 (958) 502-3495"
            },
            {
                "name": "Rachel Lowe",
                "email": "rachellowe@renovize.com",
                "phone": "+1 (911) 475-2312"
            },
            {
                "name": "Dominique Soto",
                "email": "dominiquesoto@renovize.com",
                "phone": "+1 (807) 551-3258"
            },
            {
                "name": "Shana Pope",
                "email": "shanapope@renovize.com",
                "phone": "+1 (970) 527-3082"
            },
            {
                "name": "Faulkner Flores",
                "email": "faulknerflores@renovize.com",
                "phone": "+1 (952) 501-2678"
            },
            {
                "name": "Holder Bean",
                "email": "holderbean@renovize.com",
                "phone": "+1 (989) 503-2663"
            },
            {
                "name": "Rosanne Shelton",
                "email": "rosanneshelton@renovize.com",
                "phone": "+1 (968) 454-3851"
            },
            {
                "name": "Pamela Nolan",
                "email": "pamelanolan@renovize.com",
                "phone": "+1 (986) 545-2166"
            },
            {
                "name": "Roy Cantu",
                "email": "roycantu@renovize.com",
                "phone": "+1 (929) 571-2295"
            },
            {
                "name": "Ollie Christian",
                "email": "olliechristian@renovize.com",
                "phone": "+1 (977) 419-3550"
            },
            {
                "name": "Nguyen Walls",
                "email": "nguyenwalls@renovize.com",
                "phone": "+1 (963) 471-3181"
            },
            {
                "name": "Glenna Santana",
                "email": "glennasantana@renovize.com",
                "phone": "+1 (860) 467-2376"
            },
            {
                "name": "Malone Clark",
                "email": "maloneclark@renovize.com",
                "phone": "+1 (818) 565-2557"
            },
            {
                "name": "Floyd Rutledge",
                "email": "floydrutledge@renovize.com",
                "phone": "+1 (807) 597-3629"
            },
            {
                "name": "Grace James",
                "email": "gracejames@renovize.com",
                "phone": "+1 (959) 525-2529"
            },
            {
                "name": "Tanner Gates",
                "email": "tannergates@renovize.com",
                "phone": "+1 (978) 591-2291"
            },
            {
                "name": "Lilly Conner",
                "email": "lillyconner@renovize.com",
                "phone": "+1 (842) 587-3812"
            }
        ]

        contacts.forEach(contact => this.save(contact))

    }

    private _handleError(err: HttpErrorResponse) {
        console.log('err:', err)
        return throwError(() => err)
    }
}


