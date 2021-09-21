import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appAction]'
})
export class ActionDirective {
  @Output() public appAction: EventEmitter<Event> = new EventEmitter();

  // hostingListener: vou escutar em qual essa diretiva foi colocada;
  @HostListener('click', ['$event'])
  public handleClick(event: Event): void {
    // vou passar o upload como parâmetro
    this.appAction.emit(event);
  }

  @HostListener('keyup', ['$event'])
  public handleKeyup(event: KeyboardEvent): void {
    this.appAction.emit(event);
  }
}
