import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Language {
  code: string;
  name: string;
  flag: string;
}

interface Translation {
  [key: string]: string;
}

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLanguageSubject = new BehaviorSubject<string>('en');
  private languagesSubject = new BehaviorSubject<Language[]>([]);
  
  // Define available languages
  private readonly LANGUAGES = [
    { code: 'en', name: 'English', flag: '1.png' },
    { code: 'fr', name: 'French', flag: '3.png' },
    { code: 'es', name: 'Spanish', flag: '2.png' }
  ];

  // Define translations
  private readonly TRANSLATIONS: { [key: string]: Translation } = {
    en: {
      'dashboard': 'Dashboard',
      'profile': 'Profile',
      'settings': 'Settings',
      'logout': 'Logout',
      'welcome': 'Welcome',
      'login': 'Login',
      'register': 'Register',
      'email': 'Email',
      'password': 'Password',
      'remember_me': 'Remember me',
      'forgot_password': 'Forgot password?',
      'dont_have_account': 'Don\'t have an account?',
      'already_have_account': 'Already have an account?',
      'sign_up': 'Sign up',
      'sign_in': 'Sign in'
    },
    fr: {
      'dashboard': 'Tableau de bord',
      'profile': 'Profil',
      'settings': 'Paramètres',
      'logout': 'Déconnexion',
      'welcome': 'Bienvenue',
      'login': 'Connexion',
      'register': 'S\'inscrire',
      'email': 'Email',
      'password': 'Mot de passe',
      'remember_me': 'Se souvenir de moi',
      'forgot_password': 'Mot de passe oublié?',
      'dont_have_account': 'Vous n\'avez pas de compte?',
      'already_have_account': 'Vous avez déjà un compte?',
      'sign_up': 'S\'inscrire',
      'sign_in': 'Se connecter'
    },
    es: {
      'dashboard': 'Panel de control',
      'profile': 'Perfil',
      'settings': 'Configuración',
      'logout': 'Cerrar sesión',
      'welcome': 'Bienvenido',
      'login': 'Iniciar sesión',
      'register': 'Registrarse',
      'email': 'Correo electrónico',
      'password': 'Contraseña',
      'remember_me': 'Recordarme',
      'forgot_password': '¿Olvidaste tu contraseña?',
      'dont_have_account': '¿No tienes una cuenta?',
      'already_have_account': '¿Ya tienes una cuenta?',
      'sign_up': 'Registrarse',
      'sign_in': 'Iniciar sesión'
    }
  };

  constructor() {
    this.languagesSubject.next(this.LANGUAGES);
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      this.currentLanguageSubject.next(savedLanguage);
    }
  }

  getLanguages(): Observable<Language[]> {
    return this.languagesSubject.asObservable();
  }

  getCurrentLanguage(): Observable<string> {
    return this.currentLanguageSubject.asObservable();
  }

  getCurrentLanguageFlag(): Observable<string> {
    return this.getCurrentLanguage().pipe(
      map(code => {
        const languages = this.languagesSubject.value;
        const currentLang = languages.find(lang => lang.code === code);
        return currentLang ? `/assets/images/flags/${currentLang.flag}` : '';
      })
    );
  }

  setLanguage(languageCode: string): void {
    const languages = this.languagesSubject.value;
    if (languages.some(lang => lang.code === languageCode)) {
      this.currentLanguageSubject.next(languageCode);
      localStorage.setItem('language', languageCode);
    }
  }

  translate(key: string): string {
    const currentLang = this.currentLanguageSubject.value;
    return this.TRANSLATIONS[currentLang]?.[key] || key;
  }

  getCurrentTranslations(): Translation {
    const currentLang = this.currentLanguageSubject.value;
    return this.TRANSLATIONS[currentLang] || this.TRANSLATIONS['en'];
  }
} 