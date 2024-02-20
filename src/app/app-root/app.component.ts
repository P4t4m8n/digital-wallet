import { Component, OnInit } from '@angular/core';
import { ContactService } from '../services/contact.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.contactService.query()
      .pipe(take(1)).subscribe({ error: (error) => console.log('error:', error) })
  }
}
