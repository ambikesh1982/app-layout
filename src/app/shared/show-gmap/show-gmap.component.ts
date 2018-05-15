import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ScriptLoadService } from '../../core/script-load.service';

@Component({
  selector: 'app-show-gmap',
  template: `
    <div class="map" #mapElement></div>
  `,
  styles: [`.map {
    margin: auto;
    width: 100 %;
    height: 40vh;
  }`]
})
export class ShowGmapComponent implements OnInit, AfterViewInit {
  @Input() lat: number;
  @Input() lng: number;

  @ViewChild('mapElement') mapElm: ElementRef;

  constructor(private googleMapScript: ScriptLoadService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
      this.googleMapScript.loadScript(environment.googleMapURL, 'google-map', () => {
        const center = new google.maps.LatLng(
          this.lat,
          this.lng);

        // Create map
        const map = new google.maps.Map(this.mapElm.nativeElement, {
          zoom: 18,
          center: center,
          disableDefaultUI: true,
          scrollwheel: false,
        });

        // Add Marker to current location detected by browser
        const marker = new google.maps.Marker({
          position: center,
          map: map
        });
      });
    }
  }

