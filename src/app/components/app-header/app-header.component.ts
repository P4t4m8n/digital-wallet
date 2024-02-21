import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { userService } from '../../services/user.service';
import { Observable, Subscription } from 'rxjs';
import { User } from '../../models/user.model';
import { Rate } from '../../models/bitcoin.model';
import { BitcoinService } from '../../services/bitcoinService';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.scss'
})
export class AppHeaderComponent implements OnInit, OnDestroy {
  userService = inject(userService)
  subscription!: Subscription

  user$: Observable<User> = this.userService.user$
  bitcoinService = inject(BitcoinService)

  rate$: Observable<Rate> = this.bitcoinService.rate$


  ngOnInit(): void {
    this.bitcoinService.getRate().pipe().subscribe({
      error: (error) => console.log('error:', error)
    })
  }

  ngOnDestroy(): void {

  }
}
