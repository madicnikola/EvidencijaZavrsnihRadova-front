import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from "rxjs/operators";
import {AuthService} from "../auth/auth.service";
import {ThesesService} from "../theses/theses.service";
import {environment} from "../../environments/environment";
import {StudentThesisService} from "../student-thesis/student-thesis.service";
import {Thesis} from "./model/thesis.model";
import {ProfessorPayload} from "./dto/professor.payload";
import {ProfessorService} from "../professors/professor.service";


@Injectable({
  providedIn: 'root'
})
export class DataService {

  searchOption = [];
  thesisDataUrl: string = `${environment.apiUrl}/graduate-thesis/published`;
  professorsDataUrl: string = `${environment.apiUrl}/professor/all`;


  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private thesesService: ThesesService,
    private studentThesisService: StudentThesisService,
    private professorService: ProfessorService) {
  }


  getTheses(): Observable<Thesis[]> {
    return this.http.get<Thesis[]>(this.thesisDataUrl);
  }

  // filteredListOptions() {
  //   let list = this.thesesService.getTheses();
  //   let filteredPostsList = [];
  //   for (let item of list) {
  //     for (let options of this.searchOption) {
  //       if (options.title === item.title) {
  //         filteredPostsList.push(item);
  //       }
  //     }
  //   }
  //   console.log(filteredPostsList);
  //   return filteredPostsList;
  // }

  getPublishedTheses() {
    this.http.get<Thesis[]>(this.thesisDataUrl, {
      observe: 'body',
      responseType: 'json'
    }).pipe(
      map(theses => {
        console.log(theses);
        //for (let thesis of theses){
        //
        //}
        return theses;
      }),
    ).subscribe(
      (theses) => {
        this.thesesService.setTheses(theses);
      }
    );
  }

  getMyThesis() {
    this.http.get<Thesis>(`${environment.apiUrl}/graduate-thesis/my-thesis`, {
      observe: 'body',
      responseType: 'json'
    }).pipe(
      map(thesis => {
        return thesis;
      }))
      .subscribe(thesis => {
        this.studentThesisService.setThesis(thesis);
      });
  }

  getAllProfessors() {
    this.http.get<ProfessorPayload[]>(this.professorsDataUrl, {
      observe: 'body',
      responseType: 'json'
    }).pipe(
      map(professors => {
        console.log(professors);
        //for (let thesis of theses){
        //
        //}
        return professors;
      })).subscribe(
      (professors) => {
        this.professorService.setProfessors(professors);
      }
    );
  }
}
