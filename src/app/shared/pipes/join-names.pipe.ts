import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'joinNames',
  standalone: true
})
export class JoinNamesPipe implements PipeTransform {
  transform(items: any[] | undefined, property: string = ''): string {
    if (!items || !items.length) return '';
    
    if (property) {
      return items.map(item => item[property]).join(', ');
    }
    
    return items.join(', ');
  }
} 