import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProfileModel } from '../../data/model/profile.model';

@Component({
  selector: 'app-landing-header',
  templateUrl: './landing-header.component.html',
})
export class LandingHeaderComponent {

  @Input() profile?: Observable<ProfileModel>;

}
