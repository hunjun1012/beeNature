import { Component, OnInit } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import * as firebase from 'firebase'; 

const firebaseConfig = {
  apiKey: "AIzaSyDBOvZUMUnEt6ANhOrx8KaNeiUwHenQpgY",
  authDomain: "smartfarm-a06f6.firebaseapp.com",
  databaseURL: "https://smartfarm-a06f6.firebaseio.com",
  projectId: "smartfarm-a06f6",
  storageBucket: "smartfarm-a06f6.appspot.com",
  messagingSenderId: "595981196058",
  appId: "1:595981196058:web:bf91dc7bdc01c4d717eaa3"
};

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent implements OnInit {
  back_clicked = 0;

  constructor(
      private toastCtrl: ToastController,
      private platform: Platform,
      private splashScreen: SplashScreen,
      private statusBar: StatusBar) {
      this.initializeApp();
  }

  initializeApp() {
      this.platform.ready().then(() => {
          this.statusBar.styleDefault();
          this.splashScreen.hide();
          firebase.initializeApp(firebaseConfig);
      });
  }

  ngOnInit() {
      this.appExitConfig();
  }

  private appExitConfig() {
      this.platform.backButton.subscribe(async () => {
          if (this.back_clicked === 0) {
              this.back_clicked++;

              const toast = await this.toastCtrl.create({
                  message: '뒤로가기 버튼을 한번 더 누르시면 앱이 종료됩니다.',
                  duration: 2000
              });
              toast.present();

              setTimeout(() => {
                  this.back_clicked = 0;
              }, 2000);
          } else {
              navigator['app'].exitApp();
          }
      });
  }
}

