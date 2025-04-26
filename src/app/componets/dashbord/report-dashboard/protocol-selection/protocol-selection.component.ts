import { Component, OnInit, Renderer2, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { ProtocolService } from '../../../../services/protocol.service';

@Component({
  selector: 'app-protocol-selection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './protocol-selection.component.html',
  styleUrls: ['./protocol-selection.component.scss']
})
export class ProtocolSelectionComponent implements OnInit {
  protocolsByType: { [key: string]: any[] } = {};
  loading: boolean = true;
  error: string | null = null;
  isDarkMode: boolean = false;

  constructor(
    private protocolService: ProtocolService,
    private router: Router,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.fetchProtocols();
    this.detectThemeMode();
  }

  fetchProtocols(): void {
    this.loading = true;
    this.error = null;
    
    this.protocolService.getAllProtocolsGroupedByType().subscribe({
      next: data => {
        this.protocolsByType = data;
        this.loading = false;
      },
      error: err => {
        console.error('Failed to load protocols:', err);
        this.error = 'Erreur lors du chargement des protocoles. Veuillez réessayer.';
        this.loading = false;
      }
    });
  }

  selectProtocol(protocolId: number): void {
    this.router.navigate(['/dashboard/report-dashboard/report-create', protocolId]);
  }
  
  isEmpty(obj: object): boolean {
    return Object.keys(obj).length === 0;
  }

  /**
   * Detects if the application is in dark mode by checking the data-theme-mode attribute
   */
  detectThemeMode(): void {
    if (isPlatformBrowser(this.platformId)) {
      const htmlElement = document.documentElement;
      this.isDarkMode = htmlElement.getAttribute('data-theme-mode') === 'dark';
      
      // Create an observer to watch for changes to the data-theme-mode attribute
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.attributeName === 'data-theme-mode') {
            this.isDarkMode = htmlElement.getAttribute('data-theme-mode') === 'dark';
          }
        });
      });
      
      observer.observe(htmlElement, { attributes: true });
    }
  }

  /**
   * Returns the appropriate CSS class based on current theme mode
   */
  getThemeClass(darkClass: string, lightClass: string = ''): string {
    return this.isDarkMode ? darkClass : lightClass;
  }
}
