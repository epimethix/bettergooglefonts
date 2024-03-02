import { Component, OnInit } from '@angular/core';
import { ClassificationService } from '../classification.service';

@Component({
  selector: 'app-classifier-json',
  templateUrl: './classifier-json.component.html',
  styleUrl: './classifier-json.component.scss'
})
export class ClassifierJsonComponent implements OnInit {
  classifier: { [k: string]: string[]; } = {}
  constructor(private classifierService: ClassificationService) {
  }

  ngOnInit(): void {
    this.classifier = this.classifierService.getAllAnswers()
  }


}
