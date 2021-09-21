import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { faTicketAlt } from '@fortawesome/free-solid-svg-icons';
import { element } from 'protractor';
import { PhotoFrameComponent } from './photo-frame.component';
import { PhotoFrameModule } from './photo-frame.module';

describe(PhotoFrameComponent.name, () => {
  let fixture: ComponentFixture<PhotoFrameComponent> = null;
  let component: PhotoFrameComponent

  // testa antes dos outros
  beforeEach( async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoFrameModule]
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoFrameComponent);
    component = fixture.componentInstance;
  });

  it('Should create component', () => {
    expect(component).toBeTruthy();
  })

  // faseAsync(): serve para parar o tempo.
  // tick(): pode parar em qualquer ponto da história
  it(`#${PhotoFrameComponent.prototype.like.name} Should trigger (@Outoput liked) once when called multiple times within debounce times`, fakeAsync(() => {
    fixture.detectChanges();
    let times = 0;
    component.liked.subscribe(() => times++ );
    component.like();
    component.like();
    tick(500)
    expect(times).toBe(1)
  }));

  it(`#${PhotoFrameComponent.prototype.like.name}
  should trigger (@Output liked) two times when called outside debounce time`, fakeAsync(() => {
    fixture.detectChanges();
    let times = 0;
    component.liked.subscribe(() => times++);
    component.like();
    tick(500);
    component.like();
    tick(500);
    expect(times).toBe(2);
  }))

  // fixture: é o cara que enbrulha o elemento; também tem a instância do dom, ou seja, tem acesso ao seu elemento
  it(`(D) Should display number of likes when (@Input likes) is incremented)`, () => {
    fixture.detectChanges();
    component.likes++;
    fixture.detectChanges();
    const element: HTMLElement = fixture.nativeElement.querySelector('.like-counter');
    expect(element.textContent.trim()).toBe('1')
  })

  it(`(D) Should update aria-label when (@Input likes) is incremented`, () => {
    fixture.detectChanges();
    component.likes++;
    fixture.detectChanges();
    const element: HTMLElement = fixture.nativeElement.querySelector('span');
    expect(element.getAttribute('aria-label')).toBe('1: people liked');
  })

  it('(D) Should have arial-label with default (@Input likes) values', () => {
    fixture.detectChanges();
    const element: HTMLElement = fixture.nativeElement.querySelector('span');
    expect(element.getAttribute('aria-label')).toBe('0: people liked');
  });

  it(`(D) Should display image with src and description when bound to properties`, () => {
    const description = 'Some description';
    const src = 'https://somesite.com/img.jpg';
    component.src = src;
    component.description = description;
    const img: HTMLImageElement = fixture.nativeElement.querySelector('img');
    expect(img.getAttribute('src')).toBe(src);
    expect(img.getAttribute('alt')).toBe(description)
  })
});
