import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BrowserMultiFormatReader, Result, BarcodeFormat } from '@zxing/library';

@Component({
  selector: 'app-lector',
  templateUrl: 'lector.page.html',
  styleUrls: ['lector.page.scss'],
})
export class LectorPage implements OnInit {
  qrResult: string = ''; 
  codeReader: BrowserMultiFormatReader;
  isScanning: boolean = false;
  userData: {
    nombre: string;
    apellido: string;
    datosEscaneados?: string[]; 
  } = {
    nombre: '',
    apellido: '',
  };

  @ViewChild('videoElement', { static: true }) videoElement: ElementRef | undefined;

  constructor() {
    this.codeReader = new BrowserMultiFormatReader();
  }

  ngOnInit() {
    this.getUserInfo(); 
  }

  openScanner() {
    if (this.videoElement) {
      
      const hints = new Map<BarcodeFormat, any>();
      hints.set(BarcodeFormat.QR_CODE, {});

      
      this.codeReader
        .decodeFromInputVideoDevice(undefined, this.videoElement.nativeElement)
        .then((result: Result) => {
          
          this.qrResult = result.getText(); 

          
          const datosEscaneados = this.qrResult.split(',');

          
          this.userData = {
            ...this.userData,
            datosEscaneados: datosEscaneados,
          };

          
          localStorage.setItem('userData', JSON.stringify(this.userData));

          this.isScanning = false; 
          this.getUserInfo(); 
        })
        .catch((error: any) => {
          console.error(error);
          this.isScanning = false; 
        });

      this.isScanning = true; 
    }
  }

  closeScanner() {
    
    this.codeReader.reset();
    this.qrResult = ''; 
  }

  getUserInfo() {
    
    const userInfoString = localStorage.getItem('usuario');
    
    
    if (userInfoString) { 
      const userInfo = JSON.parse(userInfoString);
  
      
      this.userData = {
        ...this.userData, 
        ...userInfo, 
        datosEscaneados: this.qrResult.split(','), 
      };
    }
  }
}