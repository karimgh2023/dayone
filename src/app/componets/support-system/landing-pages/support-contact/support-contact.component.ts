import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-support-contact',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './support-contact.component.html',
  styleUrls: ['./support-contact.component.scss']
})
export class SupportContactComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
