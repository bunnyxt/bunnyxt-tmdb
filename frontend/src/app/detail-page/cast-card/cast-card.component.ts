import { Component, OnInit, Input } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ApiService } from '../../api/api.service';

type Cast = {
  id: number;
  name: string;
  character: string;
  profile_path: string;
};

type Detail = {
  birthday: string;
  gender: number;
  name: string;
  homepage: string | null;
  also_known_as: string[];
  known_for_department: string;
  biography: string;
  place_of_birth: string;
};

type ExternalIds = {
  imdb_id: string | null;
  facebook_id: string | null;
  instagram_id: string | null;
  twitter_id: string | null;
};

@Component({
  selector: 'app-cast-card',
  templateUrl: './cast-card.component.html',
  styleUrls: ['./cast-card.component.css']
})
export class CastCardComponent implements OnInit {
  @Input() cast: Cast;
  detail: Detail = null;
  externalIds: ExternalIds = null;

  constructor(
    private modalService: NgbModal,
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
  }

  open(content): void {
    this.apiService.getPersonDetail(this.cast.id)
      .subscribe(detail => {
        this.detail = detail;
      });
    this.apiService.getPersonExternalIds(this.cast.id)
      .subscribe(externalIds => {
        this.externalIds = externalIds;
      });
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

}
