import { EmailValidator } from "@angular/forms"

export interface Contact {
    id: string
    name: string
    email: string
    phone: string
}

export interface ContactFilter {
    name: string
    phone: string
    email: string
}
