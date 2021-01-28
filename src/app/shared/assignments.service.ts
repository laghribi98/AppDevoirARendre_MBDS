import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import { Observable, of } from 'rxjs';
import { LoggingService } from './logging.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AssignmentsService {
  assignments: Assignment[] = [
    {
      id: 1,
      nom: 'TP Angular 1 à rendre !',
      dateDeRendu: new Date('01/02/2021'),
      rendu: true,
    },
    {
      id: 2,
      nom: 'Projet MOPOLO SQL',
      dateDeRendu: new Date('02/15/2021'),
      rendu: false,
    },
    {
      id: 3,
      nom: 'Lange R à finir',
      dateDeRendu: new Date('01/20/2021'),
      rendu: false,
    },
  ];

  constructor(
    private loggingService: LoggingService,
    private http: HttpClient
  ) {}

  url = 'https://apimbds2021.herokuapp.com/api/assignments';

  getAssignments(): Observable<Assignment[]> {
    console.log('Dans getAssignments dans le service...');
    this.loggingService.log('tous les assignments', 'ont été recherchés');

    // return of(this.assignments);

    return this.http.get<Assignment[]>(this.url);
  }

  getAssignment(id: number): Observable<Assignment> {
    console.log('Dans getAssignment dans le service id=' + id);
    this.loggingService.log('Assignment id=' + id, 'a été recherché');

    /*
    let assignmentTrouve: Assignment;

    this.assignments.forEach((a, index) => {
      if (a.id === id) {
        console.log("Assignment trouvé à l'index " + index);
        assignmentTrouve = a;
      }
    });
    return of(assignmentTrouve);
*/
    //return of(this.assignments.find((a) => a.id === id));
    return this.http.get<Assignment>(this.url + '/' + id);
    /*
    .pipe(
      map((a) => {
        a.nom += ' MODIFIE';
        return a;
      }),
      map((a) => {
        a.nom += ' MODIFIE2 ';
        return a;
      }),
      tap((a) => {
        console.log(' ici une trace pour le debug :' + a.nom);
      }),
      catchError(this.handleError<any>('getAssignments'))
    );
    */
  }
  private handleError<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      console.log(error); // pour afficher dans la console
      console.log(operation + ' a échoué ' + error.message);

      return of(result as T);
    };
  }

  addAssignment(assignment: Assignment): Observable<any> {
    // this.assignments.push(assignment);
    this.loggingService.log(assignment.nom, 'a été ajouté');

    return this.http.post(this.url, assignment);
  }

  updateAssignment(assignment: Assignment): Observable<any> {
    /*
    this.assignments.forEach((a, index) => {
      if (a === assignment) {
        this.assignments[index] = a;
      }
    });
    */
    this.loggingService.log(assignment.nom, 'a été mis à jour');

    return this.http.put(this.url, assignment);
  }

  deleteAssignment(assignment: Assignment): Observable<any> {
    /*
    this.assignments.forEach((a, index) => {
      if (a === assignment) {
        // suppression d'un élément du tableau
        // splice(position, nb elements à supprimer)
        this.assignments.splice(index, 1);
      }
    });
    */
    this.loggingService.log(assignment.nom, 'a été supprimé');

    return this.http.delete(this.url + '/' + assignment._id);
  }
}
