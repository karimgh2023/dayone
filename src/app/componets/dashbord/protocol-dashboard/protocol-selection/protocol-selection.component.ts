import {
  Component,
  OnInit,
  NgZone,
  ChangeDetectorRef,
  Inject,
  PLATFORM_ID,
  AfterViewInit
} from '@angular/core';
import {
  isPlatformBrowser,
  CommonModule
} from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';
import { ProtocolService } from '../../../../shared/services/protocol.service';

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
  imports: [CommonModule, FormsModule, NgbTooltipModule],
  templateUrl: './protocol-selection.component.html',
  styleUrls: ['./protocol-selection.component.scss'],
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({ height: '0', overflow: 'hidden', opacity: '0' })),
      state('expanded', style({ height: '*', overflow: 'visible', opacity: '1' })),
      transition('collapsed <=> expanded', animate('300ms ease-in-out'))
    ])
  ]
})
export class ProtocolSelectionComponent implements OnInit, AfterViewInit {
  protocolsByType: ProtocolGroup = {};
  filteredProtocolsByType: ProtocolGroup = {};
  allProtocols: Protocol[] = [];
  recentProtocols: Protocol[] = [];
  favoriteProtocols: Protocol[] = [];

  loading = true;
  error: string | null = null;
  isDarkMode = false;
  selectedProtocol: Protocol | null = null;
  expandedProtocolTypes = new Set<string>();
  searchTerm = '';
  activeView = 'all';

  constructor(
    private protocolService: ProtocolService,
    private router: Router,
    private toastr: ToastrService,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.detectThemeMode();
  }

  ngAfterViewInit(): void {
    // Run outside Angular first, then force update inside zone
    requestAnimationFrame(() => {
      this.ngZone.run(() => {
        this.fetchProtocols();
        this.loadFavoriteProtocols();
        this.loadRecentProtocols();
      });
    });
  }

  fetchProtocols(): void {
    this.loading = true;
    this.protocolService.getAllProtocolsGroupedByType().subscribe({
      next: (data) => {
        this.protocolsByType = data;
        this.filteredProtocolsByType = { ...data };
        this.allProtocols = Object.values(data).flat();
        this.updateRecentsWithFullData();
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading protocols:', err);
        this.error = 'Failed to load protocols.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  detectThemeMode(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isDarkMode = document.documentElement.getAttribute('data-theme-mode') === 'dark';
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

  getFilteredKeys(): string[] {
    return Object.keys(this.filteredProtocolsByType);
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
        const favoriteData = JSON.parse(favorites) as { id: number, lastUsed: string }[];
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
      this.recentProtocols.unshift({ ...protocol, lastUsed: new Date() });
    }

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
        const recentData = JSON.parse(recents) as { id: number, lastUsed: string }[];
        this.recentProtocols = recentData.map(item => ({
          id: item.id,
          name: `Protocol ${item.id}`,
          lastUsed: new Date(item.lastUsed)
        }));
      }
    }
  }

  private updateRecentsWithFullData(): void {
    const recentData = this.recentProtocols.map(p => ({ id: p.id, lastUsed: p.lastUsed }));
    this.recentProtocols = recentData
      .map(item => {
        const fullProtocol = this.allProtocols.find(p => p.id === item.id);
        return fullProtocol ? { ...fullProtocol, lastUsed: item.lastUsed } : null;
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
