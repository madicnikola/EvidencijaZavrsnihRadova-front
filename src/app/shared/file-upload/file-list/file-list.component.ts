import {Component, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject, Subscription} from "rxjs";
import {FileUploadService} from "../file-upload.service";
import {ThesisPayload} from "../../dto/thesis.payload";
import {VisibilityStatus} from "../../model/progress-status.model";

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.css']
})
export class FileListComponent implements OnInit, OnChanges, OnDestroy {


  fileInfos?: Observable<any>;
  @Input() filesChanged: Subject<string>;
  @Input() thesisSubject: Subject<ThesisPayload>;
  thesis: ThesisPayload;
  folderName: string;
  @Input() title: string;
  @Input() deleteEnabled: boolean = false;
  sub: Subscription;
  @Input() hideShowEnabled: boolean = false;


  constructor(private uploadService: FileUploadService) {

  }

  ngOnInit(): void {
    this.sub = this.thesisSubject.subscribe(value => {
      this.thesis = value;
      this.folderName = this.getFolderName();
      this.fileInfos = this.uploadService.getFiles(this.folderName);
    })
  }

  onDelete(filename: string) {
    this.uploadService.delete(this.getFolderName(), filename).subscribe(value => {
      console.log(value.message);
      this.fileInfos = this.uploadService.getFiles(this.folderName);
    });
  }

  ngOnChanges(changes): void {
    if (changes.thesis || changes.filesChanged || changes.deleteEnabled) {
      if (this.sub) {
        this.sub.unsubscribe();
      }
      this.sub = this.filesChanged.subscribe(value => {
        if (value) {
          this.fileInfos = this.uploadService.getFiles(this.folderName);
        }
      });
    }

  }


  getFolderName() {
    var seq = this.thesis.student.indexNumber.split("/");
    return seq[0] + seq[1];
  }


  onChangeVisibility(filename, status: VisibilityStatus) {
    if (status == 'PUBLISHED') {
      console.log('2');
      return;
    } else if (status == 'PRIVATE') {
      console.log('1');
      status = VisibilityStatus.BOARD_VIEW;
    } else {
      console.log('0');
      status = VisibilityStatus.PRIVATE;
    }
    this.uploadService.changeDocumentVisibility(this.folderName, filename, status).subscribe(value => {
      console.log('status: ' + status);
      this.fileInfos = this.uploadService.getFiles(this.folderName);
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  changeBack(filename: string, status: VisibilityStatus) {
      status = VisibilityStatus.PRIVATE;
    this.uploadService.changeDocumentVisibility(this.folderName, filename, status).subscribe(value => {
      console.log('status: ' + status);
      this.fileInfos = this.uploadService.getFiles(this.folderName);
    });

  }
}
