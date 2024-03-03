import { Component, OnInit } from '@angular/core';
import { ClassificationService } from '../classification.service';
import { JsonPipe } from '@angular/common';

@Component({
    selector: 'app-classifier-json',
    templateUrl: './classifier-json.component.html',
    styleUrl: './classifier-json.component.scss',
    standalone: true,
    imports: [JsonPipe]
})
export class ClassifierJsonComponent implements OnInit {
  classifier: { [k: string]: string[]; } = {}
  constructor(private classifierService: ClassificationService) {
  }

  ngOnInit(): void {
    this.classifier = this.classifierService.getAllAnswers()
  }


}
