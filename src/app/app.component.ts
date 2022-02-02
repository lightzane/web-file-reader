import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  file: File;
  fileContent: string;
  type: string;

  onFileSelect(event: Event, fileInput: HTMLInputElement): void {

    const { target } = event;
    const { files } = target as HTMLInputElement;

    this.file = files[0];
    this.type = this.file.name.match(/\.csv$/i) ? 'csv'
      : this.file.name.match(/\.json$/i) ? 'json'
        : this.file.name.match(/\.txt$/i) ? 'text'
          : '';

    const fileReader = new FileReader();
    fileReader.readAsText(this.file, 'utf-8');

    fileReader.onload = ((fileLoadedEvent) => {
      this.fileContent = fileLoadedEvent.target.result as string;
      fileInput.value = ''; // enable re-read when uploading same file name
    });

  }

}
