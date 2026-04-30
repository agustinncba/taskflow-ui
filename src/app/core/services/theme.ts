import { Injectable, signal, effect, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private platformId = inject(PLATFORM_ID);
  private darkMode = signal<boolean>(true);

  isDarkMode = this.darkMode.asReadonly();

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const saved = localStorage.getItem('theme-dark');
      if (saved !== null) {
        this.darkMode.set(saved === 'true');
      }
    }

    effect(() => {
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('theme-dark', String(this.darkMode()));
        if (this.darkMode()) {
          document.documentElement.classList.add('dark');
          document.documentElement.classList.remove('light');
        } else {
          document.documentElement.classList.add('light');
          document.documentElement.classList.remove('dark');
        }
      }
    });
  }

  toggleTheme() {
    this.darkMode.set(!this.darkMode());
  }
}
