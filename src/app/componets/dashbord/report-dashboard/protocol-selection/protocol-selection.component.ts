import { Component, OnInit, Renderer2, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { ProtocolService } from '../../../../services/protocol.service';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { trigger, state, style, transition, animate } from '@angular/animations';

interface Protocol {
  id: number;
  name: string;
  type?: string;
  description?: string;
  isActive?: boolean;
}

interface ProtocolGroup {
  [key: string]: Protocol[];
}

@Component({
  selector: 'app-protocol-selection',
  standalone: true,
  imports: [CommonModule, NgbTooltipModule],
  templateUrl: './protocol-selection.component.html',
  styleUrls: ['./protocol-selection.component.scss'],
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({
        height: '0',
        overflow: 'hidden',
        opacity: '0'
      })),
      state('expanded', style({
        height: '*',
        overflow: 'visible',
        opacity: '1'
      })),
      transition('collapsed <=> expanded', animate('300ms ease-in-out'))
    ])
  ]
})
export class ProtocolSelectionComponent implements OnInit {
  protocolsByType: ProtocolGroup = {};
  loading: boolean = true;
  error: string | null = null;
  isDarkMode: boolean = false;
  selectedProtocol: Protocol | null = null;
  expandedProtocolTypes: Set<string> = new Set<string>();

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
    // Find the selected protocol to possibly use it later
    for (const type in this.protocolsByType) {
      const found = this.protocolsByType[type].find(p => p.id === protocolId);
      if (found) {
        this.selectedProtocol = found;
        break;
      }
    }
    
    // Navigate to the report creation page with the protocol ID
    this.router.navigate(['/dashboard/report-dashboard/report-create', protocolId]);
  }
  
  isEmpty(obj: object): boolean {
    return Object.keys(obj).length === 0;
  }

  getProtocolCount(protocols: Protocol[]): number {
    return protocols?.length || 0;
  }

  /**
   * Toggles the expansion state of a protocol type category
   */
  toggleProtocolType(typeKey: string): void {
    if (this.expandedProtocolTypes.has(typeKey)) {
      this.expandedProtocolTypes.delete(typeKey);
    } else {
      this.expandedProtocolTypes.add(typeKey);
    }
  }

  /**
   * Checks if a protocol type category is currently expanded
   */
  isProtocolTypeExpanded(typeKey: string): boolean {
    return this.expandedProtocolTypes.has(typeKey);
  }

  /**
   * Expands all protocol type categories
   */
  expandAllProtocolTypes(): void {
    Object.keys(this.protocolsByType).forEach(type => {
      this.expandedProtocolTypes.add(type);
    });
  }

  /**
   * Collapses all protocol type categories
   */
  collapseAllProtocolTypes(): void {
    this.expandedProtocolTypes.clear();
  }

  /**
   * Checks if all protocol type categories are currently expanded
   */
  areAllProtocolTypesExpanded(): boolean {
    if (Object.keys(this.protocolsByType).length === 0) {
      return false;
    }
    return Object.keys(this.protocolsByType).every(type => this.expandedProtocolTypes.has(type));
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
