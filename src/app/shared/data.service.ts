import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {catchError, map, tap} from "rxjs/operators";
import {AuthService} from "../auth/auth.service";
import {ThesesService} from "../theses/theses.service";
import {environment} from "../../environments/environment";
import {StudentThesisService} from "../student-thesis/student-thesis.service";
import {ProfessorPayload} from "./dto/professor.payload";
import {ProfessorService} from "../professors/professor.service";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "./dialog/dialog.component";
import {NotificationPayload} from "./dto/Notification.payload";
import {NotificationService} from "../notifications/notification.service";
import {UserProfilePayload} from "./dto/userProfile.payload";
import {Student} from "./model/student.model";
import {ThesisPayload} from "./dto/thesis.payload";
import {StudentPayload} from "./dto/student.payload";
import {StudentsService} from "../students/students.service";
import {ThesesStaffService} from "../theses-staff/theses-staff.service";


const publishedThesesDataUrl = `${environment.apiUrl}/graduate-thesis/published`;
const professorsDataUrl = `${environment.apiUrl}/professor/all`;
const notifsDataUrl = `${environment.apiUrl}/notification/user`;
const titleRequestUrl = `${environment.apiUrl}/graduate-thesis/request-title`;
const titleSetUrl = `${environment.apiUrl}/graduate-thesis/set-title`;
const myThesisUrl = `${environment.apiUrl}/graduate-thesis/my-thesis`;
const studentUrl = `${environment.apiUrl}/students/`;
const studentsBoardUrl = `${environment.apiUrl}/students/board`;
const publishThesisUrl = `${environment.apiUrl}/graduate-thesis/publish`;
const unpublishThesisUrl = `${environment.apiUrl}/graduate-thesis/unpublish`;
const thesesByYearUrl = `${environment.apiUrl}/graduate-thesis/filter/`;
const allThesesUrl = `${environment.apiUrl}/graduate-thesis`;
const professorUrl = `${environment.apiUrl}/professor/`;
const thesisUrl = `${environment.apiUrl}/graduate-thesis/student/`;
const thesisByStudentUsernameUrl = `${environment.apiUrl}/graduate-thesis/student/user-profile/`;
const updateThesisUrl = `${environment.apiUrl}/graduate-thesis/update/`;
const boardMembersOptionsDataUrl = `${environment.apiUrl}/professor/board/thesis/`;
const addBoardMemberUrl = `${environment.apiUrl}/graduate-thesis/board/add`;


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
    private studentsService: StudentsService,
    private thesesStaffService: ThesesStaffService,
    public dialog: MatDialog
  ) {
  }


  getTheses(): Observable<ThesisPayload[]> {
    return this.http.get<ThesisPayload[]>(publishedThesesDataUrl);
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
    this.http.get<ThesisPayload[]>(publishedThesesDataUrl, {
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
    return this.http.get<ThesisPayload>(myThesisUrl, {
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
    return this.http.post<ThesisPayload>(titleSetUrl, {username, title},
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
      })).subscribe(thesis => {
      this.notifService.setThesis(thesis);
      this.dialog.open(DialogComponent, {
        data: {title: "Uspešno", message: "Naziv teme je uspešno postavljen!"}
      });
    });
  }

  getStudent(username: string) {
    return this.http.get<Student>(studentUrl + username, {
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

  getThesisByStudentUserName(username: string) {
    return this.http.get<ThesisPayload>(thesisByStudentUsernameUrl + username, {
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
      this.notifService.setThesis(value);
    });
  }

  getThesis() {
    return this.http.get<ThesisPayload>(myThesisUrl, {
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

  getThesisByStudentId(studentId: bigint) {
    return this.http.get<ThesisPayload>(thesisUrl + studentId, {
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
      })).pipe(tap(value => {
      this.studentsService.setThesis(value);
    }));
  }

  getMentor(mentorId: number) {
    return this.http.get<ProfessorPayload>(professorUrl + mentorId, {
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

  getMyStudents() {
    this.http.get<StudentPayload[]>(studentUrl, {
      observe: 'body',
      responseType: 'json'
    }).pipe(
      map(students => {
        console.log(students);
        //for (let thesis of theses){
        //
        //}
        return students;
      })).subscribe(
      (students) => {
        this.studentsService.setStudents(students);
      }
    );
  }

  getStudents(uri: string) {
    this.http.get<StudentPayload[]>(`${environment.apiUrl}` + uri, {
      observe: 'body',
      responseType: 'json'
    }).pipe(
      map(students => {
        console.log(students);
        //for (let thesis of theses){
        //
        //}
        return students;
      })).subscribe(
      (students) => {
        this.studentsService.setStudents(students);
      }
    );
  }

  updateThesis(thesis: ThesisPayload, thesisId: bigint) {
    return this.http.put<ThesisPayload>(updateThesisUrl + thesisId, thesis,
      {
        observe: 'body',
        responseType: 'json'
      }).pipe(
      map(thesis => {
        console.log(thesis);
        // transform here if it needs
        return thesis;
      }), catchError(err => {
        console.log('error caught');
        this.dialog.open(DialogComponent, {
          data: {title: "Error", message: err}
        });
        return throwError(err);
      })).subscribe(
      (theses) => {
        this.thesesStaffService.setUpdatedThesis(thesis);
        this.dialog.open(DialogComponent, {
          data: {title: "Obaveštenje", message: "Uspešno ažuriran završni rad!"}
        });
      });
  }

  publishThesis(thesis: ThesisPayload) {
    return this.http.post<ThesisPayload>(publishThesisUrl, thesis,
      {
        observe: 'body',
        responseType: 'json'
      }).pipe(
      map(thesis => {
        console.log(thesis);
        // transform here if it needs
        return thesis;
      }), catchError(err => {
        console.log('error caught');
        this.dialog.open(DialogComponent, {
          data: {title: "Error", message: err}
        });
        return throwError(err);
      }));
  }
  unpublishThesis(thesis: ThesisPayload) {
    return this.http.post<ThesisPayload>(unpublishThesisUrl, thesis,
      {
        observe: 'body',
        responseType: 'json'
      }).pipe(
      map(thesis => {
        console.log(thesis);
        // transform here if it needs
        return thesis;
      }), catchError(err => {
        console.log('error caught');
        this.dialog.open(DialogComponent, {
          data: {title: "Error", message: err}
        });
        return throwError(err);
      }));
  }

  getThesesByYear(year: number) {
    this.http.get<ThesisPayload[]>(thesesByYearUrl + year, {
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
        this.thesesStaffService.setTheses(theses);
      }
    );
  }

  getBoardMembersOptions(graduateThesisId: bigint) {
    this.http.get<ProfessorPayload[]>(boardMembersOptionsDataUrl + graduateThesisId, {
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
      (professors) => {
        this.thesesStaffService.setBoardMemberOptions(professors);
      }
    );}

  getAllTheses() {
    this.http.get<ThesisPayload[]>(allThesesUrl, {
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
        this.thesesStaffService.setTheses(theses);
      }
    );
  }

  getBoardMembers(boardMemberIds: number[]) {
    return this.http.post<ProfessorPayload[]>(professorUrl, boardMemberIds, {
      observe: 'body',
      responseType: 'json'
    }).pipe(catchError(err => {
        console.log('error caught');
        this.dialog.open(DialogComponent, {
          data: {title: "Error", message: err}
        });
        return throwError(err);
      }),
      tap(professors => {
        console.log(professors);
        this.thesesStaffService.setBoardMembers(professors);
      }));

  }

  setBoardMember(boardId: string, personId: string) {
    const formData: FormData = new FormData();

    formData.append('boardId', boardId);
    formData.append('professorId', personId);

    return this.http.post<ProfessorPayload>(addBoardMemberUrl, formData, {
      observe: 'body',
      responseType: 'json'
    }).pipe(catchError(err => {
        console.log('error caught');
        this.dialog.open(DialogComponent, {
          data: {title: "Error", message: err}
        });
        return throwError(err);
      }),
      tap(professor => {
        this.thesesStaffService.setNewBoardMember(professor);
      }));

  }


}
