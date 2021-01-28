import { Component, OnInit } from '@angular/core';
import { AssignmentsService } from '../shared/assignments.service';
import { Assignment } from './assignment.model';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit {
  assignmentSelectionne: Assignment;
  // tableau des assignments
  assignments: Assignment[];

  constructor(private assignmentService: AssignmentsService) {}

  ngOnInit(): void {
    console.log('Demande des assignments via le service...');
    // on utilise le service pour récupérer la liste des assignments
    this.assignmentService.getAssignments().subscribe((assignements) => {
      // on ne rentre ici que quand les données sont prêtes
      // par ex, le service peut utiliser une BD distance et des WebService
      // pour récupérer les données..
      this.assignments = assignements;
      console.log('Données reçues...');
    });
    console.log('getAssignments appelé....');
  }

  assignmentClique(a: Assignment) {
    console.log('Assignment cliqué : ' + a.nom);
    this.assignmentSelectionne = a;
  }

  onNouvelAssignment(newAssignment: Assignment) {
    //this.assignments.push(newAssignment);
    this.assignmentService.addAssignment(newAssignment).subscribe((message) => {
      // on ne rentre ici que quand l'ajout (insert) a bien été
      // effectué !
      console.log(message);
    });

    // et on cache le formulaire et on réaffiche la liste à jour
    //this.formVisible = false;
  }
}
