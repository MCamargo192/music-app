import { Component, OnInit } from '@angular/core';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {

  favourites: Array<any>;
  favouritesSub: any;

  constructor(private musicService: MusicDataService) { }

  ngOnInit(): void {
    this.favouritesSub = this.musicService.getFavourites().subscribe(data => this.favourites = data.tracks);
  }

  removeFromFavourites(id): void {
    this.favouritesSub = this.musicService.removeFromFavourites(id).subscribe(data => this.favourites = data.tracks);
  }

  ngOnDestroy(): void {
    this.favouritesSub.unsubscribe();
  }

}
