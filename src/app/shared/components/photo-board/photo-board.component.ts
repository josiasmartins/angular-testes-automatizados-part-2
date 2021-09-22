import { identifierModuleUrl } from '@angular/compiler';
import { Component, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { Photo } from './interfaces/photo';

@Component({
  selector: 'app-photo-board',
  templateUrl: './photo-board.component.html',
  styleUrls: ['./photo-board.component.scss']
})
export class PhotoBoardComponent implements OnChanges {

  @Input() public photos: Photo[];
  // array multidimensional
  public rows: any[][] = [];

  // será disparado sempre meu property put mudar
  // verficicar porque depois porque não aceita SimplesChanges
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.photos) {
      this.rows = this.groupColums(changes.photos.currentValue);
    }
  }


  private groupColums(photos: Photo[]): any[][] {
    const newRows = [];
    const step = 4;

    for (let index = 0; index < photos.length; index += step) {
      newRows.push(photos.slice(index, index + step));
    }
    return newRows;
  }

}
