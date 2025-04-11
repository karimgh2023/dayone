import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppStateService } from './shared/services/app-state.service';
@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [ RouterOutlet]
})
export class AppComponent {
  title = 'dayone';

  constructor(private appState : AppStateService){
    this.appState.updateState();
  }
}
