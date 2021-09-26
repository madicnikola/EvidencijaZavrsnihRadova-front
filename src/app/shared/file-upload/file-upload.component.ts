import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable, Subject, Subscription} from "rxjs";
import {FileUploadService} from "./file-upload.service";
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {ThesisPayload} from "../dto/thesis.payload";
import {UP_ARROW} from "@angular/cdk/keycodes";

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  fileInfos?: Observable<any> = new Observable<any>();
  @Output() uploaded = new EventEmitter<string>();
  @Input() thesis: ThesisPayload;
  folderName: string;
  @Input() fileType: string;

  constructor(private uploadService: FileUploadService) {
  }

  ngOnInit(): void {
    this.fileInfos = this.uploadService.getFiles(this.getFolderName());
    this.uploaded.emit("start");
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    this.progress = 0;
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        this.uploadService.upload(this.currentFile,this.fileType).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              this.uploadService.setThesis(this.thesis);
            }
            this.uploaded.emit('uploaded');
          },
          (err: any) => {
            console.log(err);
            this.progress = 0;

            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }
            this.currentFile = undefined;
          });
      }
      this.selectedFiles = undefined;
    }
  }

  getFolderName() {
    var seq = this.thesis.student.indexNumber.split("/");
    return seq[0] + seq[1];
  }

}
