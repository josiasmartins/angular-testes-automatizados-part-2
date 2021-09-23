import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { PhotoBoardService } from 'src/app/shared/components/photo-board/services/photo-board';
import { buildingPhotoList } from 'src/app/shared/components/photo-board/test/build-photos-list';
import { PhotoListComponent } from './photo-list.component';
import { PhotoListModule } from './photo-list.module';

describe(PhotoListComponent.name, () => {

  let fixture: ComponentFixture<PhotoListComponent>;
  let component: PhotoListComponent;
  let service: PhotoBoardService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PhotoListModule,
        HttpClient
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoListComponent);
    component = fixture.componentInstance;
    // TestBed: permite criar componentes e também permite instanciar serviço, contanto que estaja disponivel com providerss
    service = TestBed.inject(PhotoBoardService);
  });

  it('Should create component', () => {
    expect(component).toBeTruthy();
  });

  it(`(D) Should display loader while waitingfor data board when data arrives`, () => {
    // vai disparar o ciclo de vida
    fixture.detectChanges();
    const photos = buildingPhotoList()
    // spyOn(): spy de quem; de qual método
    spyOn(service, 'getPhoto')
      .and.returnValue(of(photos)); // API de meu serviço é uma observable, então ela precisa de of()
    fixture.detectChanges();
    const board = fixture.nativeElement
      .querySelector('app-photo-board');
    const loader = fixture.nativeElement
      .querySelector('.loader');
    expect(board).withContext('Should not display board').toBeNull();
    expect(loader).withContext('Should display loader').not.toBeNull();
  })
});
