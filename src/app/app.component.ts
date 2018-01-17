import {Component, OnInit} from '@angular/core';
import {Environment} from './decorators/environment.decorator';
import {LifecycleLogger} from './decorators/lifecycle-logger.decorator';
import {FunctionLogger} from './decorators/function-logger.decorator';
import {AppService} from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

@LifecycleLogger()
export class AppComponent implements OnInit {

  @Environment('title')
  title;

  constructor(private appService: AppService) {
  }

  ngOnInit() {
    this.getRandomString('getRandomString');
    this.appService.getRandomString('getRandomString');
  }

  @FunctionLogger
  getRandomString(name: string): string {
    return this.title;
  }
}
