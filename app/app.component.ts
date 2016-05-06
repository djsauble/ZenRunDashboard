import {Component} from '@angular/core';
import {OnInit} from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';

import {Run} from './run';
import {RunService} from './run.service';

@Component({
  selector: 'my-app',
  template: `
    <h1>Forrest Cruise Dashboard</h1>
    <ul>
      <li *ngFor="let run of runs">
        {{run.timestamp}}
      </li>
    </ul>
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
                         return (new Date(b.timestamp)) - (new Date(a.timestamp));
                       }),
                       error => this.errorMessage = <any>error);
  }

  ngOnInit() {
    this.getRuns();
  }
}
