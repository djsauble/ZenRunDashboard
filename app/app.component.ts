import {Component} from '@angular/core';
import {OnInit} from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';

import {Run} from './run';
import {RunService} from './run.service';

@Component({
  selector: 'my-app',
  template: `
    <h1>Forrest Cruise Dashboard</h1>
    <ol>
      <li *ngFor="let run of runs">
        <strong>{{run.timestamp}}</strong><br/>
        {{run._id}}<br/><br/>
      </li>
    </ol>
  `,
  providers: [
    HTTP_PROVIDERS,
    RunService
  ]
})
export class AppComponent implements OnInit {
  constructor(private runService: RunService) { }

  public runs: Run[];
  public errorMessage: string;

  getRuns() {
    this.runService.getRuns()
                     .subscribe(
                       runs => this.runs = runs.sort((a: Run, b: Run) => {
                         return (new Date(b.timestamp)).getTime() - (new Date(a.timestamp)).getTime();
                       }),
                       error => this.errorMessage = <any>error);
  }

  ngOnInit() {
    this.getRuns();
  }
}
