import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-container',
  template: `
    <p>
      container works!
    </p>
  `,
  styles: [
  ]
})
export class ContainerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
