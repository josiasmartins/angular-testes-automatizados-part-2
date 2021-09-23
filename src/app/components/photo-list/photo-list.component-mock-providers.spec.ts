import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { Photo } from 'src/app/shared/components/photo-board/interfaces/photo';
import { PhotoBoardService } from 'src/app/shared/components/photo-board/services/photo-board';
import { PhotoBoardMockService } from 'src/app/shared/components/photo-board/services/photo-board-mock.service';
import { buildingPhotoList } from 'src/app/shared/components/photo-board/test/build-photos-list';
import { PhotoListComponent } from './photo-list.component';
import { PhotoListModule } from './photo-list.module';

describe(PhotoListComponent.name + ' Mock Provider', () => {

  let fixture: ComponentFixture<PhotoListComponent>;
  let component: PhotoListComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PhotoListModule,
        HttpClient
      ],
      providers: [{
        provide: PhotoBoardService,
        useClass: PhotoBoardMockService
      }]
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoListComponent);
    component = fixture.componentInstance;
    // TestBed: permite criar componentes e também permite instanciar serviço, contanto que estaja disponivel com providerss
  });

  it('Should create component', () => {
    expect(component).toBeTruthy();
  });

  it(`(D) Should display loader while waitingfor data board when data arrives`, () => {
    // vai disparar o ciclo de vida
    fixture.detectChanges();
    const photos = buildingPhotoList()
    fixture.detectChanges();
    const board = fixture.nativeElement
      .querySelector('app-photo-board');
    const loader = fixture.nativeElement
      .querySelector('.loader');
    expect(board).withContext('Should not display board').toBeNull();
    expect(loader).withContext('Should display loader').not.toBeNull();
  })
});
