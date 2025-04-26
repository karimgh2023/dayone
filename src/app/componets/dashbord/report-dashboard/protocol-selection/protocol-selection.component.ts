import { Component, OnInit, Renderer2, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProtocolService } from '../../../../services/protocol.service';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { trigger, state, style, transition, animate } from '@angular/animations';

interface Protocol {
  id: number;
  name: string;
  type?: string;
  description?: string;
  isActive?: boolean;
  lastUsed?: Date; // For tracking recent protocols
  isFavorite?: boolean; // For favorite protocols
}

interface ProtocolGroup {
  [key: string]: Protocol[];
}

@Component({
  selector: 'app-protocol-selection',
  standalone: true,
  imports: [CommonModule, NgbTooltipModule, FormsModule],
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
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
    ])
  ]
})
export class ProtocolSelectionComponent implements OnInit {
  protocolsByType: ProtocolGroup = {};
  allProtocols: Protocol[] = [];
  recentProtocols: Protocol[] = [];
  favoriteProtocols: Protocol[] = [];
  
  filteredProtocolsByType: ProtocolGroup = {};
  
  loading: boolean = true;
  error: string | null = null;
  isDarkMode: boolean = false;
  selectedProtocol: Protocol | null = null;
  expandedProtocolTypes: Set<string> = new Set<string>();
  
  searchTerm: string = '';
  activeView: string = 'all'; // 'all', 'favorites', 'recent'

  constructor(
    private protocolService: ProtocolService,
    private router: Router,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.fetchProtocols();
    this.detectThemeMode();
    this.loadFavoriteProtocols();
    this.loadRecentProtocols();
  }

  fetchProtocols(): void {
    this.loading = true;
    this.error = null;
    
    this.protocolService.getAllProtocolsGroupedByType().subscribe({
      next: data => {
        this.protocolsByType = data;
        this.filteredProtocolsByType = {...data};
        
        // Flatten all protocols for searching
        this.allProtocols = [];
        Object.keys(data).forEach(key => {
          this.allProtocols = [...this.allProtocols, ...data[key]];
        });
        
        // Populate favorites and recents with full protocol data
        this.updateFavoritesWithFullData();
        this.updateRecentsWithFullData();
        
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
    // Find the selected protocol
    const found = this.allProtocols.find(p => p.id === protocolId);
    if (found) {
      this.selectedProtocol = found;
      
      // Add to recent protocols
      this.addToRecentProtocols(found);
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
   * Toggle favorite status of a protocol
   */
  toggleFavorite(event: Event, protocol: Protocol): void {
    event.stopPropagation(); // Prevent the protocol from being selected
    
    protocol.isFavorite = !protocol.isFavorite;
    
    if (protocol.isFavorite) {
      this.favoriteProtocols.push(protocol);
    } else {
      this.favoriteProtocols = this.favoriteProtocols.filter(p => p.id !== protocol.id);
    }
    
    // Save favorites to localStorage
    localStorage.setItem('favoriteProtocols', JSON.stringify(
      this.favoriteProtocols.map(p => p.id)
    ));
  }
  
  /**
   * Load favorite protocols from localStorage
   */
  loadFavoriteProtocols(): void {
    const favorites = localStorage.getItem('favoriteProtocols');
    if (favorites) {
      const favoriteIds = JSON.parse(favorites) as number[];
      this.favoriteProtocols = favoriteIds.map(id => ({ id, name: `Protocol ${id}` }));
    }
  }
  
  /**
   * Update favorites with complete protocol data after fetching
   */
  updateFavoritesWithFullData(): void {
    const favoriteIds = this.favoriteProtocols.map(p => p.id);
    this.favoriteProtocols = this.allProtocols
      .filter(p => favoriteIds.includes(p.id))
      .map(p => ({...p, isFavorite: true}));
      
    // Also mark favorite protocols in the main list
    this.allProtocols = this.allProtocols.map(p => ({
      ...p,
      isFavorite: favoriteIds.includes(p.id)
    }));
  }
  
  /**
   * Add a protocol to recent protocols
   */
  addToRecentProtocols(protocol: Protocol): void {
    // Remove if already exists
    this.recentProtocols = this.recentProtocols.filter(p => p.id !== protocol.id);
    
    // Add to beginning with timestamp
    const protocolWithDate = {...protocol, lastUsed: new Date()};
    this.recentProtocols.unshift(protocolWithDate);
    
    // Limit to 5 recent protocols
    if (this.recentProtocols.length > 5) {
      this.recentProtocols.pop();
    }
    
    // Save to localStorage
    localStorage.setItem('recentProtocols', JSON.stringify(
      this.recentProtocols.map(p => ({id: p.id, lastUsed: p.lastUsed}))
    ));
  }
  
  /**
   * Load recent protocols from localStorage
   */
  loadRecentProtocols(): void {
    const recents = localStorage.getItem('recentProtocols');
    if (recents) {
      const recentData = JSON.parse(recents) as {id: number, lastUsed: string}[];
      this.recentProtocols = recentData.map(item => ({
        id: item.id,
        name: `Protocol ${item.id}`,
        lastUsed: new Date(item.lastUsed)
      }));
    }
  }
  
  /**
   * Update recents with complete protocol data after fetching
   */
  updateRecentsWithFullData(): void {
    const recentData = this.recentProtocols.map(p => ({id: p.id, lastUsed: p.lastUsed}));
    this.recentProtocols = recentData
      .map(item => {
        const fullProtocol = this.allProtocols.find(p => p.id === item.id);
        return fullProtocol 
          ? {...fullProtocol, lastUsed: item.lastUsed} 
          : null;
      })
      .filter(p => p !== null) as Protocol[];
  }
  
  /**
   * Search protocols with the search term
   */
  searchProtocols(): void {
    if (!this.searchTerm.trim()) {
      this.filteredProtocolsByType = {...this.protocolsByType};
      return;
    }
    
    const term = this.searchTerm.toLowerCase();
    
    // Filter each protocol group
    this.filteredProtocolsByType = {};
    Object.keys(this.protocolsByType).forEach(key => {
      const filtered = this.protocolsByType[key].filter(
        p => p.name.toLowerCase().includes(term) || 
             p.id.toString().includes(term) ||
             (p.description && p.description.toLowerCase().includes(term))
      );
      
      if (filtered.length > 0) {
        this.filteredProtocolsByType[key] = filtered;
        // Auto-expand this category if it has matches
        this.expandedProtocolTypes.add(key);
      }
    });
  }
  
  /**
   * Set active view (all, favorites, recent)
   */
  setActiveView(view: string): void {
    this.activeView = view;
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
    Object.keys(this.filteredProtocolsByType).forEach(type => {
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
    if (Object.keys(this.filteredProtocolsByType).length === 0) {
      return false;
    }
    return Object.keys(this.filteredProtocolsByType).every(type => this.expandedProtocolTypes.has(type));
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
  
  /**
   * Format date nicely for display
   */
  formatDate(date: Date | undefined): string {
    if (!date) return '';
    
    const now = new Date();
    const dateObj = new Date(date);
    
    // If today
    if (dateObj.toDateString() === now.toDateString()) {
      return "Aujourd'hui";
    }
    
    // If yesterday
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    if (dateObj.toDateString() === yesterday.toDateString()) {
      return 'Hier';
    }
    
    // Otherwise format as date
    return dateObj.toLocaleDateString('fr-FR');
  }
}
