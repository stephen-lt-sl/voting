import { trigger, state, style, transition, animate } from '@angular/animations';

export const expandAnimation =
  trigger('expandAnimation', [
    state('active', style({ 'max-height': '2em' })),
    state('inactive', style({ 'max-height': '0' })),
    transition('active <=> inactive', animate(500)),
  ]);
