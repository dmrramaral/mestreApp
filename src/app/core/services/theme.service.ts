import { isPlatformBrowser } from '@angular/common';
import { effect, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

export type Theme = 'light' | 'dark' | 'auto';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'app-theme';
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);
  private mediaQuery?: MediaQueryList;

  // Using Angular signals for reactive theme management
  theme = signal<Theme>(this.getInitialTheme());

  // Computed signal for the effective theme (resolves 'auto' to light/dark)
  private effectiveTheme = signal<'light' | 'dark'>('light');

  constructor() {
    // Setup system theme preference listener
    this.setupSystemThemeListener();

    // Apply theme whenever it changes
    effect(() => {
      const theme = this.theme();
      const resolved = this.resolveTheme(theme);
      this.effectiveTheme.set(resolved);
      this.applyTheme(resolved);
    }, { allowSignalWrites: true });
  }

  private setupSystemThemeListener(): void {
    if (!this.isBrowser) {
      return;
    }

    // Listen to system dark mode preference
    this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    // Update theme when system preference changes (only if theme is set to 'auto')
    this.mediaQuery.addEventListener('change', (e) => {
      if (this.theme() === 'auto') {
        const resolved = e.matches ? 'dark' : 'light';
        this.effectiveTheme.set(resolved);
        this.applyTheme(resolved);
      }
    });
  }

  private getInitialTheme(): Theme {
    // Only access localStorage in browser environment
    if (!this.isBrowser) {
      return 'auto';
    }

    // Check localStorage first
    const savedTheme = localStorage.getItem(this.THEME_KEY) as Theme;
    if (savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'auto') {
      return savedTheme;
    }

    // Default to auto (follows system preference)
    return 'auto';
  }

  private resolveTheme(theme: Theme): 'light' | 'dark' {
    if (theme === 'auto') {
      // Use system preference
      if (this.isBrowser && this.mediaQuery) {
        return this.mediaQuery.matches ? 'dark' : 'light';
      }
      return 'light'; // Default fallback
    }
    return theme;
  }

  private applyTheme(theme: 'light' | 'dark'): void {
    // Only apply theme changes in browser environment
    if (!this.isBrowser) {
      return;
    }

    const body = document.body;

    // Remove all theme classes
    body.classList.remove('light-theme', 'dark-theme');

    // Add the current theme class
    body.classList.add(`${theme}-theme`);

    // Save preference to localStorage (save the selected preference, not the resolved one)
    localStorage.setItem(this.THEME_KEY, this.theme());
  }

  toggleTheme(): void {
    const currentTheme = this.theme();
    let newTheme: Theme;

    // Cycle through: light -> dark -> auto -> light
    if (currentTheme === 'light') {
      newTheme = 'dark';
    } else if (currentTheme === 'dark') {
      newTheme = 'auto';
    } else {
      newTheme = 'light';
    }

    this.theme.set(newTheme);
  }

  setTheme(theme: Theme): void {
    this.theme.set(theme);
  }

  isDark(): boolean {
    return this.effectiveTheme() === 'dark';
  }

  isAuto(): boolean {
    return this.theme() === 'auto';
  }

  getEffectiveTheme(): 'light' | 'dark' {
    return this.effectiveTheme();
  }
}
