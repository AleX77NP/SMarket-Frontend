import { Component, OnInit } from '@angular/core';
import {faTwitter, faFacebook, faInstagram, faWhatsapp} from '@fortawesome/free-brands-svg-icons'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  twitter = faTwitter;
  facebook = faFacebook;
  instagram = faInstagram;
  whatsapp = faWhatsapp;

  constructor() { }

  ngOnInit(): void {
  }

}
