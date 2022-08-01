import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor() { 
    console.log('Test Service: init!')
  }

  log() {
    console.log('Test Service: works!')
  }
}
