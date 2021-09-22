import {Injectable, Input, Output} from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {environment} from "../../../environments/environment";
import {ThesisPayload} from "../dto/thesis.payload";

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  @Output() thesisChanged = new Subject<ThesisPayload>();
  @Input() thesis: ThesisPayload;

  constructor(private http: HttpClient) {
  }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${environment.apiUrl}/doc/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  getFiles(folderName: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/doc/files/` + folderName);
  }

  delete(folderName: string, filename: string) {
    return this.http.delete<{ message: string }>(`${environment.apiUrl}/doc/files/` + folderName + '/' + filename, {
      observe: 'body',
      responseType: 'json'
    });
  }


  setThesis(thesis: ThesisPayload) {
    this.thesis = thesis;
    this.thesisChanged.next(thesis);
  }

  getThesis() {
    return this.thesis;
  }
}
