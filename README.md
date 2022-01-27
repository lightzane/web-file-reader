# Web File Reader

Upload CSV correct format:
```
A,B,C,D,E
1,2,5,5,3
2,2,1,1,5
5,2,1,4,4
2,5,1,5,3
5,3,5,2,2
1,5,5,5,5
2,4,5,2,1
3,3,3,2,3
1,4,1,3,2
3,5,2,1,4
4,3,2,1,5
4,1,3,1,2
4,2,3,5,5
5,5,5,1,4
1,2,4,4,1
1,2,3,1,1
1,5,4,5,2
4,2,4,4,2
2,5,1,4,2
```

This is a demo web application on reading an uploaded file using the HTML [FileReader API](https://developer.mozilla.org/en-US/docs/Web/API/FileReader/FileReader)

See demo: https://lightzane.github.io/web-file-reader

**app.component.html**

```html
<input type="file" (change)="onFileSelect($event)" accept=".csv, application/vnd.ms-excel, application/json, text/plain" />
```

Filters `.csv`, `.json` and `.txt` files in system uploader

**app.component.ts**

```ts
export class AppComponent {
    file: File;
    fileContent: string;
    type: string;

    onFileSelect(event: Event): void {
        const { target } = event;
        const { files } = target as HTMLInputElement;

        this.file = files[0];

        const fileReader = new FileReader();
        fileReader.readAsText(this.file, 'utf-8');

        fileReader.onload = (fileLoadedEvent) => {
            this.fileContent = fileLoadedEvent.target.result as string;
        };
    }
}
```

# Reference

-   https://developer.mozilla.org/en-US/docs/Web/API/FileReader/FileReader
