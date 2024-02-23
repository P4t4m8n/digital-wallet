import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
    providedIn: 'root'
})

export class OverlayService {
    private overlayVisible = new BehaviorSubject<boolean>(false)
    public overlayVisible$ = this.overlayVisible.asObservable()

    showOverlay() {
        this.overlayVisible.next(true)
    }

    hideOverlay() {
        this.overlayVisible.next(false)
    }
}
