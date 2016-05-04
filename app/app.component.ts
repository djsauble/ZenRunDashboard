import {Component} from '@angular/core';
import {OnInit} from '@angular/core';

import {Run} from './run';
import {RunService} from './run.service';

@Component({
  selector: 'my-app',
  template: `
    <h1>Forrest Cruise Dashboard</h1>
    <ul>
      <li *ngFor="let run of runs">
        Distance: {{run.distance}}
      </li>
    </ul>
  `,
  providers: [RunService]
})
export class AppComponent implements OnInit {
  public runs: Run[];

  constructor(private runService: RunService) { }

  getRuns() {
    this.runs = this.runService.getRuns();
  }

  ngOnInit() {
    this.getRuns();
  }
}
