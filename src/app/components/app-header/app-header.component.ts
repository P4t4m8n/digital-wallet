import { Component, OnDestroy, OnInit, inject } from '@angular/core'
import { UserService } from '../../services/user.service'
import { Observable, Subscription } from 'rxjs'
import { User } from '../../models/user.model'
import { Rate } from '../../models/bitcoin.model'
import { BitcoinService } from '../../services/bitcoinService'

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.scss'
})
export class AppHeaderComponent implements OnInit, OnDestroy {
  userService = inject(UserService)
  bitcoinService = inject(BitcoinService)

  subscription!: Subscription

  user$: Observable<User> = this.userService.user$
  rate$: Observable<Rate> = this.bitcoinService.rate$

  isSlideIn = false

  ngOnInit(): void {
    this.bitcoinService.getRate().pipe().subscribe({
      error: (error) => console.log('error:', error)
    })
  }

  setIsSlideIn = () => {
    console.log(" this.isSlideIn:",  this.isSlideIn)
    this.isSlideIn = !this.isSlideIn
    console.log(" this.isSlideIn:",  this.isSlideIn)
  }

  ngOnDestroy(): void {

  }
}
