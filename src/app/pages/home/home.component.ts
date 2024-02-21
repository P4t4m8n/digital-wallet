import { Component, inject } from '@angular/core';
import { BitcoinService } from '../../services/bitcoinService';
import { Observable } from 'rxjs';
import { Rate } from '../../models/bitcoin.model';
import { userService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  bitcoinService = inject(BitcoinService)
  userService = inject(userService)
  rate$: Observable<Rate> = this.bitcoinService.rate$
  user$: Observable<User> = this.userService.user$

}
