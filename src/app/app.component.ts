import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';

interface NewRow {
  category: string;
  _5: number;
  _4: number;
  _3: number;
  _2: number;
  _1: number;
}

interface Ratings {
  name: string;
  percent: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  file: File;
  fileContent: string;

  rowContent: string[];
  columnContent: string[];

  ELEMENT_DATA: NewRow[] = [];
  ELEMENT_COLUMNS = ['category', '5', '4', '3', '2', '1'];

  data$ = new BehaviorSubject<NewRow[]>([]);

  ratings: Ratings[] = [];
  totalRating: number;

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
    this.totalRating = null;
  }

  onFileSelect(event: Event): void {
    this.resetFileDisplay();

    const { target } = event;
    const { files } = target as HTMLInputElement;

    this.file = files[0];

    const fileReader = new FileReader();
    fileReader.readAsText(this.file, 'utf-8');

    fileReader.onload = ((fileLoadedEvent) => {

      if (!this.file.name.match(/\.csv$/)) {
        this.snackbar.open('Please upload CSV file');
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

      // console.log(JSON.stringify(this.ELEMENT_DATA));

      this.snackbar.open('File uploaded successfully', 'OK');
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
        _1: 0
      };

      for (let i in this.rowContent) {
        const val = this.rowContent[i].split(',')[col];
        if (!val) continue;
        if (val.match(/5/g)) newRow._5++;
        else if (val.match(/4/g)) newRow._4++;
        else if (val.match(/3/g)) newRow._3++;
        else if (val.match(/2/g)) newRow._2++;
        else if (val.match(/1/g)) newRow._1++;
      }

      data.push(newRow);

    }

    this.data$.next(data);

  }

  downloadCsv(): void {
    let csv = 'Category,5,4,3,2,1,%\n';
    let i = 0;
    for (let row of this.ELEMENT_DATA) {
      csv += `${row.category},${row._5},${row._4},${row._3},${row._2},${row._1},${this.ratings[i].percent}\n`;
      i++;
    }

    // Create element <a> tag
    const download = document.createElement('a');
    download.style.display = 'none';
    // Set filename when downloading
    download.setAttribute('download', 'ratings.csv');
    // Set content
    download.setAttribute(
      'href',
      'data:text/plain;charset=utf-8,' + encodeURIComponent(csv)
    );
    // Append the element to the body
    document.body.appendChild(download);
    // Simulate click
    download.click();
    // Remove the element
    document.body.removeChild(download);
  }

  computeRatings(): void {
    let or = 0;

    for (let col in this.columnContent) {
      let rating = 0;
      let newRatings: Ratings = {
        name: '',
        percent: ''
      };
      newRatings.name = this.columnContent[col];

      for (let prop in this.ELEMENT_DATA[col]) {
        if (prop === 'category') continue; // this is category.
        const n = +prop.substring(1, 2); // _5 --> 5
        rating += (n * +this.ELEMENT_DATA[col][prop]); // index 1 = _5
      }

      // accumulate to get total percent
      or += rating;

      newRatings.percent = rating.toFixed(2);
      this.ratings.push(newRatings);
    }
    console.log(this.ratings);
    this.totalRating = or;
  }

  downloadSampleCsv(): void {
    let csv = `A,B,C,D,E\r\n`;

    for (let i = 1; i < 20; i++) {
      csv += `${this.randomNumberFrom(1, 5)},${this.randomNumberFrom(1, 5)},${this.randomNumberFrom(1, 5)},${this.randomNumberFrom(1, 5)},${this.randomNumberFrom(1, 5)}\r\n`;
    }

    // Create element <a> tag
    const download = document.createElement('a');
    download.style.display = 'none';
    // Set filename when downloading
    download.setAttribute('download', 'sample.csv');
    // Set content
    download.setAttribute(
      'href',
      'data:text/plain;charset=utf-8,' + encodeURIComponent(csv)
    );
    // Append the element to the body
    document.body.appendChild(download);
    // Simulate click
    download.click();
    // Remove the element
    document.body.removeChild(download);
  }

  private randomNumberFrom(min: number, max: number) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

}
