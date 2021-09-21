import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError, map} from "rxjs/operators";
import {AuthService} from "../auth/auth.service";
import {ThesesService} from "../theses/theses.service";
import {environment} from "../../environments/environment";
import {StudentThesisService} from "../student-thesis/student-thesis.service";
import {Thesis} from "./model/thesis.model";
import {ProfessorPayload} from "./dto/professor.payload";
import {ProfessorService} from "../professors/professor.service";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "./dialog/dialog.component";
import {NotificationPayload} from "./dto/Notification.payload";
import {NotificationService} from "../notifications/notification.service";
import {UserProfilePayload} from "./dto/userProfile.payload";
import {Student} from "./model/student.model";
import {ThesisPayload} from "./dto/thesis.payload";


const publishedThesesDataUrl = `${environment.apiUrl}/graduate-thesis/published`;
const professorsDataUrl = `${environment.apiUrl}/professor/all`;
const notifsDataUrl = `${environment.apiUrl}/notification/user`;
const titleRequestUrl = `${environment.apiUrl}/graduate-thesis/request-title`;
const titleSetUrl = `${environment.apiUrl}/graduate-thesis/set-title`;
const MyThesisUrl = `${environment.apiUrl}/graduate-thesis/my-thesis`;
const StudentUrl = `${environment.apiUrl}/student/`
const ProfessorUrl = `${environment.apiUrl}/professor/`;


@Injectable({
  providedIn: 'root'
})
export class DataService {

  searchOption = [];


  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private thesesService: ThesesService,
    private studentThesisService: StudentThesisService,
    private professorService: ProfessorService,
    private notifService: NotificationService,
    public dialog: MatDialog
  ) {
  }


  getTheses(): Observable<Thesis[]> {
    return this.http.get<Thesis[]>(publishedThesesDataUrl);
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
    this.http.get<Thesis[]>(publishedThesesDataUrl, {
      observe: 'body',
      responseType: 'json'
    }).pipe(
      map(theses => {
        console.log(theses);
        //for (let thesis of theses){
        //
        //}
        return theses;
      }), catchError(err => {
        console.log('error caught');
        this.dialog.open(DialogComponent, {
          data: {title: "Error", message: err}
        });
        return throwError(err);
      })
    ).subscribe(
      (theses) => {
        this.thesesService.setTheses(theses);
      }
    );
  }

  getMyThesis() {
    return this.http.get<ThesisPayload>(MyThesisUrl, {
      observe: 'body',
      responseType: 'json'
    }).pipe(
      map(thesis => {
        return thesis;
      }), catchError(err => {
        console.log('error caught');
        this.dialog.open(DialogComponent, {
          data: {title: "Error", message: err}
        });
        return throwError(err);
      }));
  }


  getAllProfessors() {
    this.http.get<ProfessorPayload[]>(professorsDataUrl, {
      observe: 'body',
      responseType: 'json'
    }).pipe(
      map(professors => {
        console.log(professors);
        //for (let thesis of theses){
        //
        //}
        return professors;
      }),
      catchError(err => {
        console.log('error caught');
        this.dialog.open(DialogComponent, {
          data: {title: "Error", message: err}
        });
        return throwError(err);
      }))
      .subscribe(
        (professors) => {
          this.professorService.setProfessors(professors);
        }
      );
  }

  sendTitleRequest(professorId: bigint): Observable<string> {
    return this.http.post<{ message: string }>(titleRequestUrl, professorId)
      .pipe(map(data => {
          console.log(data.message);
          return data.message;
        }),
        catchError(err => {
          console.log('error caught');
          this.dialog.open(DialogComponent, {
            data: {title: "Error", message: err}
          });
          return throwError(err);
        }));
  }

// login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {
//   return this.client.post<AuthenticationResponse>(`${environment.apiUrl}/auth/login`,
//     loginRequestPayload).pipe(map(data => {
//     this.loggedIn.emit(true);
//     this.username.emit(data.username);
//     this.token = data.authenticationToken;
//     localStorage.setItem('token', JSON.stringify(data.authenticationToken));
//     localStorage.setItem('user', JSON.stringify(data));
//     this.userSubject.next(data);
//     this.router.navigate(['/']);
//     return true;
//   }));
// }

  getAllNotifs() {
    this.http.get<{
      notifications: NotificationPayload[],
      user: UserProfilePayload
    }>(notifsDataUrl, {
      observe: 'body',
      responseType: 'json'
    }).pipe(
      map(notifs => {
        console.log(notifs);
        //for (let thesis of theses){
        //
        //}
        return notifs;
      })).subscribe(
      (notifs) => {
        this.notifService.setNotifications(notifs.notifications);
      }
    );
  }

  setTitle(username: string, title: string) {
    return this.http.post<{ message: string }>(titleSetUrl, {username, title},
      {
        observe: 'body',
        responseType: 'json'
      }).pipe(
      map(messageDto => {
        console.log(messageDto);
        // transform here if it needs
        return messageDto;
      }), catchError(err => {
        console.log('error caught');
        this.dialog.open(DialogComponent, {
          data: {title: "Error", message: err}
        });
        return throwError(err);
      }));

  }

  getStudent(username: string) {
    return this.http.get<Student>(StudentUrl + username, {
      observe: 'body',
      responseType: 'json'
    }).pipe(
      map(student => {
        // transform here if it needs

        return student;
      }), catchError(err => {
        console.log('error caught');
        this.dialog.open(DialogComponent, {
          data: {title: "Error", message: err}
        });
        return throwError(err);
      })).subscribe(value => {
      this.notifService.setStudent(value);
    });
  }

  getThesis() {
    return this.http.get<ThesisPayload>(MyThesisUrl, {
      observe: 'body',
      responseType: 'json'
    }).pipe(catchError(err => {
      console.log('error caught');
      this.dialog.open(DialogComponent, {
        data: {title: "Error", message: err}
      });
      return throwError(err);
    })).subscribe(value => {
      this.notifService.setThesis(value);
    });
  }

  getMentor(mentorId: number) {
    return this.http.get<ProfessorPayload>(ProfessorUrl + mentorId, {
      observe: 'body',
      responseType: 'json'
    }).pipe(catchError(err => {
      console.log('error caught');
      this.dialog.open(DialogComponent, {
        data: {title: "Error", message: err}
      });
      return throwError(err);
    }), map(value => {
      // do here

      return value;
    }));
  }
}
