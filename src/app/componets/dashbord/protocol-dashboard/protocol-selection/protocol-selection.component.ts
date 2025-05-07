import { Component, OnInit, Renderer2, PLATFORM_ID, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { User } from '../../../../models/user.model';
import { UserService } from '../../../../shared/services/user.service';
import { ProtocolService } from '../../../../shared/services/protocol.service';
import { ToastrService } from 'ngx-toastr';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { TaskDashboardPageHeaderComponent } from '../../task-dashboard/task-dashboard-page-header/task-dashboard-page-header.component';

interface Protocol {
  id: number;
  name: string;
  type?: string;
  description?: string;
  isActive?: boolean;
  lastUsed?: Date;
  isFavorite?: boolean;
}

interface ProtocolGroup {
  [key: string]: Protocol[];
}

@Component({
  selector: 'app-protocol-selection',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbTooltipModule, TaskDashboardPageHeaderComponent],
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
  filteredProtocolsByType: ProtocolGroup = {};
  allProtocols: Protocol[] = [];
  recentProtocols: Protocol[] = [];
  favoriteProtocols: Protocol[] = [];
  
  loading: boolean = true;
  error: string | null = null;
  isDarkMode: boolean = false;
  selectedProtocol: Protocol | null = null;
  expandedProtocolTypes: Set<string> = new Set<string>();
  
  searchTerm: string = '';
  activeView: string = 'all';

  constructor(
    private protocolService: ProtocolService,
    private router: Router,
    private renderer: Renderer2,
    private toastr: ToastrService,
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
    this.protocolService.getAllProtocolsGroupedByType().subscribe({
      next: (data) => {
        this.protocolsByType = data;
        this.filteredProtocolsByType = { ...data };
        this.allProtocols = Object.values(data).flat();
        this.loading = false;
        this.updateRecentsWithFullData();
      },
      error: (err) => {
        this.error = 'Failed to load protocols. Please try again later.';
        this.loading = false;
        console.error('Error loading protocols:', err);
      }
    });
  }

  detectThemeMode(): void {
    if (isPlatformBrowser(this.platformId)) {
      const isDark = document.documentElement.getAttribute('data-theme-mode') === 'dark';
      this.isDarkMode = isDark;
    }
  }

  getTotalProtocols(): number {
    return this.allProtocols.length;
  }

  getActiveProtocols(): number {
    return this.allProtocols.filter(p => p.isActive).length;
  }

  getRecentUsage(): number {
    return this.recentProtocols.length;
  }

  getCategoryCount(): number {
    return Object.keys(this.protocolsByType).length;
  }

  filterProtocols(): void {
    if (!this.searchTerm.trim()) {
      this.filteredProtocolsByType = { ...this.protocolsByType };
      return;
    }

    const searchLower = this.searchTerm.toLowerCase();
    this.filteredProtocolsByType = {};

    Object.entries(this.protocolsByType).forEach(([type, protocols]) => {
      const filtered = protocols.filter(p => 
        p.name.toLowerCase().includes(searchLower) ||
        p.description?.toLowerCase().includes(searchLower)
      );
      if (filtered.length > 0) {
        this.filteredProtocolsByType[type] = filtered;
      }
    });
  }

  toggleProtocolType(typeKey: string): void {
    if (this.expandedProtocolTypes.has(typeKey)) {
      this.expandedProtocolTypes.delete(typeKey);
    } else {
      this.expandedProtocolTypes.add(typeKey);
    }
  }

  isProtocolTypeExpanded(typeKey: string): boolean {
    return this.expandedProtocolTypes.has(typeKey);
  }

  selectProtocol(protocolId: number): void {
    const found = this.allProtocols.find(p => p.id === protocolId);
    if (found) {
      this.selectedProtocol = found;
      this.addToRecentProtocols(found);
      this.router.navigate(['/dashboard/report-dashboard/report-create', protocolId]);
    }
  }

  toggleFavorite(event: Event, protocol: Protocol): void {
    event.stopPropagation();
    protocol.isFavorite = !protocol.isFavorite;
    
    if (protocol.isFavorite) {
      this.favoriteProtocols.push(protocol);
    } else {
      this.favoriteProtocols = this.favoriteProtocols.filter(p => p.id !== protocol.id);
    }
    
    this.saveFavoriteProtocols();
  }

  private saveFavoriteProtocols(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('favoriteProtocols', JSON.stringify(
        this.favoriteProtocols.map(p => ({ id: p.id, lastUsed: p.lastUsed }))
      ));
    }
  }

  private loadFavoriteProtocols(): void {
    if (isPlatformBrowser(this.platformId)) {
      const favorites = localStorage.getItem('favoriteProtocols');
      if (favorites) {
        const favoriteData = JSON.parse(favorites) as {id: number, lastUsed: string}[];
        this.favoriteProtocols = favoriteData.map(item => ({
          id: item.id,
          name: `Protocol ${item.id}`,
          lastUsed: new Date(item.lastUsed)
        }));
      }
    }
  }

  private addToRecentProtocols(protocol: Protocol): void {
    const recent = this.recentProtocols.find(p => p.id === protocol.id);
    if (recent) {
      recent.lastUsed = new Date();
    } else {
      this.recentProtocols.unshift({
        ...protocol,
        lastUsed: new Date()
      });
    }
    
    // Keep only last 5 recent protocols
    this.recentProtocols = this.recentProtocols.slice(0, 5);
    
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('recentProtocols', JSON.stringify(
        this.recentProtocols.map(p => ({ id: p.id, lastUsed: p.lastUsed }))
      ));
    }
  }

  private loadRecentProtocols(): void {
    if (isPlatformBrowser(this.platformId)) {
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
  }

  private updateRecentsWithFullData(): void {
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

  setActiveView(view: string): void {
    this.activeView = view;
  }

  getThemeClass(darkClass: string, lightClass: string = ''): string {
    return this.isDarkMode ? darkClass : lightClass;
  }

  formatDate(date: Date | undefined): string {
    if (!date) return '';
    return new Date(date).toLocaleDateString();
  }
}
  
