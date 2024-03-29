import { Injectable } from "@angular/core"
import { BehaviorSubject } from "rxjs"
import { User } from "../models/user.model"

const ENTITY = 'user'
@Injectable({
    providedIn: 'root'
})
export class UserService {

    private _user$ = new BehaviorSubject<User>({
        name: "Puki Ben David",
        coins: 100,
        moves: [],
        imgUrl: ''
    })
    public user$ = this._user$.asObservable()

    getLoggedInUser() {
        return this._user$.value
    }

}