// import { SimpleChange, SimpleChanges } from '@angular/core';
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { Photo } from './interfaces/photo';
// import { PhotoBoardComponent } from './photo-board.component';
// import { PhotoBoardModule } from './photo-board.module';

// describe(PhotoBoardComponent.name, () => {
//   let fixture: ComponentFixture<PhotoBoardComponent>;
//   let component: PhotoBoardComponent;

//   beforeEach( async () => {
//     await TestBed.configureTestingModule({
//       imports: [PhotoBoardModule]
//     }).compileComponents();

//     fixture = TestBed.createComponent(PhotoBoardComponent);
//     component = fixture.componentInstance;
//   })

//   it(`Should display rows and colums when (@Input photos) has value`, () => {
//     const change: SimpleChanges = {
//       photos: new SimpleChange([], component.photos, true)
//     }
//     component.ngOnChanges(change);
//     component.photos = buildingPhotoList();
//     fixture.detectChanges();
//     expect(component.rows.length).withContext('Number of rows').toBe(2);
//     expect(component.rows[0].length)
//       .withContext('Number of colums from the first row')
//       .toBe(4);
//     expect(component.rows[1].length)
//       .withContext('Number of colums from the segund row')
//       .toBe(4)
//   })

// })
