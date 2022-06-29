import { Component } from '@angular/core';
import { MarvelapiService } from './services/marvelapi.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'marvel-app';

  public comics: Array<any> = [];
  public offset: any = '0';
  public limit: any = '100';

  constructor() {}

  ngOnInit(): void {

  }
}
