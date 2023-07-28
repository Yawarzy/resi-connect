import {Component, OnInit} from '@angular/core';
import {SelectFieldOption} from "../../../shared";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  selectedLocation: string = 'all';
  locations: SelectFieldOption[] = [
    {label: 'All', value: 'all', default: true},
    {label: 'Location 1', value: 'location1'},
    {label: 'Location 2', value: 'location2'},
    {label: 'Location 3', value: 'location3'},
    {label: 'Location 4', value: 'location4'},
  ]

  popularAccomodations: any[] = [
    {
      name: 'Accomodation 1',
      address: 'Location 1',
      image: 'https://picsum.photos/300/300',
      price: 100,
    },
    {
      name: 'Accomodation 2',
      address: 'Location 2',
      image: 'https://picsum.photos/300/300',
      price: 200,
    },
    {
      name: 'Accomodation 3',
      address: 'Location 3',
      image: 'https://picsum.photos/300/300',
      price: 300,
    }
  ]

  constructor() {
  }

  ngOnInit(): void {
  }

}
