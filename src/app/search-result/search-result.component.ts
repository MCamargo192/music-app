import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  results: any;
  searchQuery: any;
  searchSub: any;
  paramSub: any;

  constructor(private musicService: MusicDataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.paramSub = this.route.queryParams.subscribe(params=>{
      this.searchQuery = params.q;
      this.searchSub = this.musicService.searchArtist(this.searchQuery).subscribe(data => this.results = data.artists.items.filter(item => item.images.length > 0));
    });
  }

  ngOnDestroy(): void {
    this.searchSub.unsubscribe();
    this.paramSub.unsubscribe();
  }

}
