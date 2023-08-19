import { Injectable } from '@angular/core';
import { JsonPlaceholder } from './json-placeholder';

@Injectable({ providedIn: 'root' })
export class JsonPlaceholderService {
  placeholders: JsonPlaceholder[] = [];

  add(placeholder: JsonPlaceholder) {
    this.placeholders.push(placeholder);
  }

  clear() {
    this.placeholders = [];
  }
}
