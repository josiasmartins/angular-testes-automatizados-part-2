import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing';
import { doesNotReject } from 'assert';
import { PhotoBoardService } from './photo-board';

const mockData = {
  api: 'http://localhost:300/photos',
  data: [
    {
      id: '',
      description: 'exemplo 1',
      src: ''
    },
    {
      id: '',
      description: 'exemplo 2',
      src: ''
    }
  ]
}

describe(PhotoBoardService.name, () => {

  let service: PhotoBoardService;
  let httpController: HttpTestingController;

  // o async não precisa no service (opcional).
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PhotoBoardService]
    });

    service = TestBed.inject(PhotoBoardService);
    httpController = TestBed.inject(HttpTestingController)
  })

  // afterEach(): checa se ter alguma requisição que não recebeu uma resposta
  afterEach(() => httpController.verify());

  it(`#${PhotoBoardService.prototype.getPhoto.name} Should return photos with description in uppercase`, done => {
    service.getPhoto().subscribe(photos => {
      expect(photos[0].description).toBe('EXEMPLO 1');
      expect(photos[1].description).toBe('EXEMPLO 2');
      done();
    });
    // expectOne(): esperá uma requisição para o mock data
    httpController
     .expectOne('http://localhost:3000/photos')
     .flush(mockData.data);   // flush(): me retorna o dado do parâmetro
    httpController.verify()
  });
})
