import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppStateService } from './shared/services/app-state.service';
import { AuthService } from './shared/services/auth.service';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet]
})
export class AppComponent implements OnInit {
  title = 'dayone';

  constructor(
    private appState: AppStateService,
    private authService: AuthService
  ) {
    this.appState.updateState();
  }
  
  ngOnInit(): void {
    // Validate and clean up any corrupted tokens at app startup
    this.validateTokens();
  }
  
  private validateTokens(): void {
    console.log('[App] Validating tokens at startup');
    try {
      // This will call the validateStoredToken() method we added to AuthService
      // which will check if the token is valid and clear it if not
      this.authService.validateStoredToken();
    } catch (error) {
      console.error('[App] Error validating tokens:', error);
      // If any error occurs during validation, clear all auth data as a safety measure
      this.authService.clearAuthData();
    }
  }
}
