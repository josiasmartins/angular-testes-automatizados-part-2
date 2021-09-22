import { Component, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Photo } from './interfaces/photo';
import { PhotoBoardComponent } from './photo-board.component';
import { PhotoBoardModule } from './photo-board.module';

function buildingPhotoList(): Photo[] {
  const photos: Photo[] = [];
  for (let i = 0; i < 8; i++) {
    photos.push({
      id: i + '1',
      url: '',
      description: ''
    });
  }

  return photos;
}

describe(PhotoBoardComponent.name, () => {
  let fixture: ComponentFixture<PhotoBoardTestComponent>;
  let component: PhotoBoardTestComponent;

  beforeEach( async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoBoardModule]
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoBoardTestComponent);
    component = fixture.componentInstance;
  })

  it(`Should display rows and colums when (@Input photos) has value`, () => {
    component.photos = buildingPhotoList();
    fixture.detectChanges();
    expect(component.board.rows.length).withContext('Number of rows').toBe(2);
    expect(component.board.rows[0].length)
      .withContext('Number of colums from the first row')
      .toBe(4);
    expect(component.board.rows[1].length)
      .withContext('Number of colums from the segund row')
      .toBe(4)
  })

})


@Component({
  template: `
    <app-photo-board [photos]="photos"></app-photo-board>
  `
})
export class PhotoBoardTestComponent {
  @ViewChild(PhotoBoardComponent) public board: PhotoBoardComponent;
  public photos: Photo[] = [];
}
