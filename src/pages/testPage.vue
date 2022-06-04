<!-- <template>
    

<ion-list>
  <ion-list-header>
    <ion-label>
      Objects as Values (compareWith)
    </ion-label>
  </ion-list-header>

  <ion-item>
    <ion-label>Users</ion-label>
    <ion-select [compareWith]="compareWith" multiple="true">
      <ion-select-option *ngFor="let user of users" [value]="user">{{user.first + ' ' + user.last}}</ion-select-option>
    </ion-select>
  </ion-item>
</ion-list>

</template>


<script>


import { Component } from '@angular/core';

interface User {
  id: number;
  first: string;
  last: string;
}

@Component({
  selector: 'select-example',
  templateUrl: 'select-example.html',
  styleUrls: ['./select-example.css'],
})
export class SelectExample {
  users: User[] = [
    {
      id: 1,
      first: 'Alice',
      last: 'Smith',
    },
    {
      id: 2,
      first: 'Bob',
      last: 'Davis',
    },
    {
      id: 3,
      first: 'Charlie',
      last: 'Rosenburg',
    }
  ];

  compareWith(o1: User, o2: User | User[]) {
    if (!o1 || !o2) {
      return o1 === o2;
    }

    if (Array.isArray(o2)) {
      return o2.some((u: User) => u.id === o1.id);
    }

    return o1.id === o2.id;
  }
}

</script> -->