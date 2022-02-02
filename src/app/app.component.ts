import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { NewRow } from './models/new-row.model';
import { Ratings } from './models/ratings.model';
import { myFadeIn, mySlideIn } from './my-animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [myFadeIn, mySlideIn]
})
export class AppComponent {

  file: File;
  fileContent: string;

  rowContent: string[];
  columnContent: string[];

  ELEMENT_DATA: NewRow[] = [];
  ELEMENT_COLUMNS = ['category', '5', '4', '3', '2', '1', 'na'];

  data$ = new BehaviorSubject<NewRow[]>([]);

  ratings: Ratings[] = [];
  totalRating: number = 5;
  average: number;

  constructor(private readonly snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.data$.subscribe((data) => {
      this.ELEMENT_DATA = [...data];
    });
  }

  resetFileDisplay(): void {
    this.file = null;
    this.fileContent = null;
    this.data$.next([]);
    this.ratings = [];
    this.totalRating = 5;
    this.rowContent = null;
    this.columnContent = null;
    this.average = null;
  }

  onFileSelect(event: Event, fileInput: HTMLInputElement): void {
    this.resetFileDisplay();

    const { target } = event;
    const { files } = target as HTMLInputElement;

    this.file = files[0];

    const fileReader = new FileReader();
    fileReader.readAsText(this.file, 'utf-8');

    fileReader.onload = ((fileLoadedEvent) => {

      if (!this.file.name.match(/\.csv$/)) {
        this.snackbar.open('Please upload CSV file', 'OK');
        this.resetFileDisplay();
        return;
      }
      this.fileContent = fileLoadedEvent.target.result as string;
      this.rowContent = this.getRowContents(this.fileContent);
      this.columnContent = this.rowContent[0].split(',');

      // remove first item since this contains headers
      this.rowContent.splice(0, 1);

      // console.log(this.rowContent);
      // console.log(this.columnContent);

      this.generateTableContent();
      this.computeRatings();
      this.computeAverage();

      // console.log(JSON.stringify(this.ELEMENT_DATA));

      if (!this.rowContent.length) {
        this.snackbar.open('Please upload a VALID CSV file', 'OK');
        this.resetFileDisplay();
        return;
      }

      fileInput.value = ''; // resets the input to allow re-read when uploading same file name
      this.snackbar.open('File uploaded successfully');
    });

  }

  getRowContents(value: string): string[] {
    const rows = value.split('\r\n');
    return rows;
  }

  generateTableContent(): void {

    let data = [];

    for (let col in this.columnContent) {

      const newRow: NewRow = {
        category: this.columnContent[col],
        _5: 0,
        _4: 0,
        _3: 0,
        _2: 0,
        _1: 0,
        na: 0
      };

      for (let i in this.rowContent) {
        const val = this.rowContent[i].split(',')[col];
        if (!val) continue;
        if (val.match(/^5/g)) newRow._5++;
        else if (val.match(/^4/g)) newRow._4++;
        else if (val.match(/^3/g)) newRow._3++;
        else if (val.match(/^2/g)) newRow._2++;
        else if (val.match(/^1/g)) newRow._1++;
        else if (val.match(/^(NA|na)/g)) newRow.na++;
      }

      data.push(newRow);

    }

    this.data$.next(data);

  }

  downloadCsv(): void {
    let csv = 'Category,5,4,3,2,1,NA,Total,Rating %\r\n';
    let i = 0;
    for (let row of this.ELEMENT_DATA) {
      const total = +row._5 + +row._4 + +row._3 + +row._2 + +row._1;
      csv += `${row.category},${row._5},${row._4},${row._3},${row._2},${row._1},${row.na},${total},${this.ratings[i].percent}\r\n`;
      i++;
    }

    this.downloadData('ratings.csv', csv);
  }

  private downloadData(filename: string, data: string): void {
    // Create element <a> tag
    const download = document.createElement('a');
    download.style.display = 'none';
    // Set filename when downloading
    download.setAttribute('download', filename);
    // Set content
    download.setAttribute(
      'href',
      'data:text/plain;charset=utf-8,' + encodeURIComponent(data)
    );
    // Append the element to the body
    document.body.appendChild(download);
    // Simulate click
    download.click();
    // Remove the element
    document.body.removeChild(download);
  }

  computeRatings(): void {

    for (let col in this.columnContent) {
      let rating = 0;
      let newRatings: Ratings = {
        category: '',
        percent: ''
      };
      newRatings.category = this.columnContent[col];

      let total = 0;

      for (let prop in this.ELEMENT_DATA[col]) {
        if (prop === 'category') continue; // this is category.\
        if (prop === 'na') continue; // do not include NA (Not Applicable)
        const n = +prop.substring(1, 2); // _5 --> 5

        // (5 x val1) + (4 x val2) ... + (1 x val5)
        rating += (n * +this.ELEMENT_DATA[col][prop]); // index 1 = _5

        // accumulate total 5,4,3,2 and 1 rating
        total += +this.ELEMENT_DATA[col][prop];
      }

      newRatings.percent = (rating / total).toFixed(2);
      this.ratings.push(newRatings);
    }
  }

  downloadSampleCsv(): void {
    let csv = `A,B,C,D,E\r\n`;

    for (let i = 1; i <= 20; i++) {
      csv += `${this.randomNumberFrom(0, 5)},${this.randomNumberFrom(0, 5)},${this.randomNumberFrom(0, 5)},${this.randomNumberFrom(0, 5)},${this.randomNumberFrom(0, 5)}\r\n`;
    }

    // Create element <a> tag
    this.downloadData('sample.csv', csv);
  }

  private randomNumberFrom(min: number, max: number): string | number { // min and max included 
    const x = Math.floor(Math.random() * (max - min + 1) + min);
    if (x <= 0) return 'NA';
    return x;
  }

  computeAverage() {
    // get sum of ratings.percent
    const sum = this.ratings.reduce((a, b) => { return a + +b.percent; }, 0);
    this.average = sum / this.ratings.length;
  }

}
