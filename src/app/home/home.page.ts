import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
/* import { LocalNotifications,ILocalNotification} from '@ionic-native/local-notifications'   */


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {
  public date = new Date().toLocaleTimeString();
  public items = [];
  object;
  status;
  isManual;

  img01;
  img02;

  doorStatus;
  temperature;
  beeSensor;
  constructor(/* private local: LocalNotifications */) { }
  
  /* showNotification(){
    let options:ILocalNotification={
      text:"demo of local notification",
      title:"local notification",
    }
    this.local.schedule(options);
  } */

    public url = "http://172.30.1.39:8090/?action=stream";
    
    //firebase 값 가져오기
  ngOnInit() {
    firebase.database().ref('settings/beeSensor').on('value', (val) => {
      console.log(val.val());
      this.beeSensor = val.val();
      this.statusChange();
      //this.showNotification();
    });

    firebase.database().ref('settings/status/temperature').on('value', (val) => {
      console.log(val.val());
      this.temperature = val.val();
    });

    firebase.database().ref('settings/status').on('value', (val) => {
      console.log(val.val());
      this.doorStatus = val.val()['door'];
      this.statusChange();
    });

    firebase.database().ref('settings/status/isManual').on('value', (val) => {
      console.log(val.val());
      this.isManual = val.val();
    });
  }

  open() {
    firebase.database().ref('settings').update({
      "beeDoorController": "o"
    })
  }

  close() {
    firebase.database().ref('settings').update({
      "beeDoorController": "c"
    })
  }

  manualBtn() {
    if (this.isManual == "True") {
      firebase.database().ref('settings/status').update({
        "isManual": "False"
      })
    } else {
      firebase.database().ref('settings/status').update({
        "isManual": "True"
      })
    }

  }

  doorBtn() {
    if (this.doorStatus == "c") {
      firebase.database().ref('settings').update({
        "beeDoorController": "o"
      })
    } else {
      firebase.database().ref('settings').update({
        "beeDoorController": "c"
      })
    }


  }

  statusChange() {
    this.items.push({
      "date": this.date = new Date().toLocaleTimeString(),
      "bee": this.beeSensor == "1" ? "감지" : "없음",
      "temp": this.temperature,
      "door": this.doorStatus == "c" ? "닫힘" : "열림"
    })
    this.items.reverse();
  }

  reset() {
    if (confirm("정말 삭제하시겠습니까?") == true) {    //확인
      this.items = [];
    } else {   //취소
      return false;
    }
  }
}