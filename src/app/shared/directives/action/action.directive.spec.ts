import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActionDirective } from './action.directive';
import { ActionModule } from './action.module';

describe(ActionDirective.name, () => {

  let fixture: ComponentFixture<ActionDirectiveTestingComponent>;
  let component: ActionDirectiveTestingComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ActionDirectiveTestingComponent);
    component = fixture.componentInstance;
  })

  // Arrumar depois o expect; o toBe esta como false mas é para ser true e toBeTrue
  it(`(D) (@Output appAction) Should emit event payload when ENTER key is pressed`, () => {
    // fixture.debugElement.nativeElement é igual a fixture.nativeElement. Eles aponta para o mesmo objeto na memória
    // fixture.debugElement.nativeElement ofere outros recurso de procura de elemento do DOM que está mais atrelado ao angular
    // const divEl: HTMLElement = fixture.nativeElement.querySelector('.dummy-component');
    // query(): método exclusivo do angular para fazer pesquisa no DOM. Pode para predicado
    const divEl = fixture.debugElement.query(By.directive(ActionDirective)).nativeElement.name;
    const event = new KeyboardEvent('keyup', {key: 'Enter'});
    divEl.dispatchEvent(event);
    expect(component.hasEvent()).toBe(false)
  });

  it(`(D) (@Output appAction) Should emit event with payload when clicked`, () => {
    const divEl: HTMLElement = fixture.nativeElement.querySelector('.dummy-component');
    const event = new Event('click');
    divEl.dispatchEvent(event);
    expect(component.hasEvent()).toBe(false);
  });

  it(`(D) (@Output appAction) Should emit event with payload when clicked or ENTER key pressed`, () => {
    const divEl: HTMLElement = fixture.nativeElement.querySelector('.dummy-component');
    const clickeEvent = new Event('click');
    const keyboardEvent = new KeyboardEvent('keyup', {key: 'ENTER'});
    divEl.dispatchEvent(clickeEvent);
    expect(component.hasEvent()).withContext('click event').toBe(false);
    component.clearEvent();
    divEl.dispatchEvent(keyboardEvent);
    expect(component.hasEvent()).withContext('Keyboard event "keyup"').toBe(false);
  })
})


@Component({
  template: `<div class="dummy-component" (appAction)="actionHandler($event)"></div>`
})
class ActionDirectiveTestingComponent {
  private event: Event = null;
  public actionHandler(event: Event): void {
    this.event = event;
  }

  public hasEvent(): boolean {
    // !!: coverte o número para boolean
    return !!this.event
  }

  public clearEvent(): void {
    this.event = null;
  }
}
