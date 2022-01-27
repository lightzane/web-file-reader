import { animate, animateChild, query, stagger, style, transition, trigger } from "@angular/animations";


export const myListAnimation = trigger('myListAnimation', [
  transition('* => *', [
    query('@myFadeIn', [
      stagger('0.2s', animateChild())
    ])
  ])
]);

export const myFadeOut = trigger('myFadeOut', [
  transition(':leave', [
    animate('0.5s ease-out', style({ opacity: 0 }))
  ])
]);

export const mySlideIn = trigger('mySlideIn', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateX(-50%)' }),
    animate('0.5s cubic-bezier(0, 1.4, 1, 1)')
  ])
]);

export const myFadeIn = trigger('myFadeIn', [
  transition(':enter', [
    style({ opacity: 0, background: 'yellow' }),
    animate('0.5s ease-in')
  ])
]);