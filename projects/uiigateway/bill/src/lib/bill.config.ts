import { InjectionToken } from '@angular/core';

export interface Config {
  apiUrl?: string;
}
export const ENV = new InjectionToken<string>('ENV');
