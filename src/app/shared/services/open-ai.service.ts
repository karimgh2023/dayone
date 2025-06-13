import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenAiService {
  private apiUrl = 'https://openrouter.ai/api/v1/chat/completions';

  // ⚠️ Remplace cette clé par une variable d’environnement en prod
  private apiKey = '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';

  constructor(private http: HttpClient) {}

  askAi(prompt: string): Observable<string> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'http://localhost:4200', // ton site ou localhost
      'X-Title': 'DTT' // nom de ton appli
    });

    const body = {
      model: 'meta-llama/llama-4-maverick:free', // modèle gratuit et stable
      messages: [
        {
          role: 'system',
          content: 'Tu es un assistant utile pour un projet de gestion technique.'
        },
        {
          role: 'user',
          content: prompt
        }
      ]
    };

    return this.http.post<any>(this.apiUrl, body, { headers }).pipe(
      tap(res => console.log('[AI Response]', res)), // debug
      map(res => res.choices[0]?.message?.content || '🤖 Aucune réponse.'),
      catchError(err => {
        console.error('❌ Erreur lors de l’appel à OpenRouter:', err);
        return throwError(() => err);
      })
    );
  }
}
