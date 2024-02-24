import { Component, OnInit, inject } from '@angular/core'
import { BitcoinService } from '../../services/bitcoinService'
import { Observable } from 'rxjs'
import { Rate } from '../../models/bitcoin.model'
import { UserService } from '../../services/user.service'
import { User } from '../../models/user.model'

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  bitcoinService = inject(BitcoinService)
  userService = inject(UserService)
  rate$: Observable<Rate> = this.bitcoinService.rate$
  user$: Observable<User> = this.userService.user$

  ngOnInit(): void {
      console.log(this.rate$)
  }

}
