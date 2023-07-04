import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  menuType:string='default';

  constructor(private route:Router) { }

  ngOnInit(): void {
    this.route.events.subscribe((val:any)=>{
      if(val.url){
        // console.log(val.url);
        if(localStorage.getItem('admin') && val.url.includes('admin')){
            console.log('This is admin space');
            this.menuType = 'admin'
        }else{
          console.log('Outside admin space');
          this.menuType ='default';
        }
      }
    })
  }

}
