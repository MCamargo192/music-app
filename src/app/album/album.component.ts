import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MusicDataService } from '../music-data.service';
import { ActivatedRoute } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

  album: any;
  albumSub: any;
  paramsSub: any;
  addSub: any;
  
  constructor(private musicService: MusicDataService, private snackBar: MatSnackBar, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.paramsSub = this.route.params.subscribe(params=> {
      this.albumSub = this.musicService.getAlbumById(params.id).subscribe(data => this.album = data);
    })
  }

  addToFavourites(trackID): void {
    this.addSub = this.musicService.addToFavourites(trackID).subscribe(
      success => this.snackBar.open("Adding to Favourites...", "Done", { duration: 1500 }),
      err => this.snackBar.open("Unable to add song to Favourites", "Done", { duration: 1500 })
    );
  }

  ngOnDestroy(): void {
    this.albumSub.unsubscribe();
    this.paramsSub.unsubscribe();
    this.addSub.unsubscribe();
  }

}
