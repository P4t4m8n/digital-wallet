import { Component, Input } from '@angular/core';

@Component({
  selector: 'burger-icon',
  templateUrl: './burger-icon.component.html',
  styleUrl: './burger-icon.component.scss'
})
export class BurgerIconComponent {
  @Input() isSlideIn: boolean = false
}
