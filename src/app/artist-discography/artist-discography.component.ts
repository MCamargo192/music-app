import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html',
  styleUrls: ['./artist-discography.component.css']
})
export class ArtistDiscographyComponent implements OnInit {

  albums: any;
  artist: any;
  paramsSub: any;
  albumsSub: any;
  artistSub: any;
  
  constructor(private musicService: MusicDataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.paramsSub = this.route.params.subscribe(params=> {
      this.artistSub = this.musicService.getArtistById(params.id).subscribe(data => this.artist = data);
      this.albumsSub = this.musicService.getAlbumsByArtistId(params.id).subscribe(data => this.albums = data.items.filter((item, index, array) => array.findIndex(elem => (elem.name.toLowerCase() === item.name.toLowerCase())) === index));
    })
  }

  ngOnDestroy(): void {
    this.albumsSub.unsubscribe();
    this.artistSub.unsubscribe();
    this.paramsSub.unsubscribe();
  }

}
