import { Component, OnInit } from '@angular/core';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-new-releases',
  templateUrl: './new-releases.component.html',
  styleUrls: ['./new-releases.component.css']
})
export class NewReleasesComponent implements OnInit {
  
  releases: any;
  releasesSub: any;
  
  constructor(private musicService: MusicDataService) { }

  ngOnInit(): void {
    this.releasesSub = this.musicService.getNewReleases().subscribe(data => this.releases = data.albums.items);
  }

  ngOnDestroy(): void {
    this.releasesSub.unsubscribe();
  }

}
