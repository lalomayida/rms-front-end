import { Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  items: NbMenuItem[] = [
    {
      title: 'Requisiciones',
      icon: 'file-text-outline',
      expanded: true,
      children: [
        {
          title: 'Ver Requisiciones',
          icon: 'eye-outline',
        },
        {
          title: 'Crear Requisiciones',
          icon: 'file-add-outline',
        },
      ]
    },
    {
      title: 'Usuarios',
      icon: 'people-outline',
      expanded: true,
      children: [
        {
          title: 'Ver Usuarios',
          icon: 'eye-outline',
        },
        {
          title: 'Crear Usuarios',
          icon: 'person-add-outline',
        },
      ]
    },
    {
      title: 'Instalaciones',
      icon: 'pin-outline',
      expanded: true,
      children: [
        {
          title: 'Ver Instalaciones',
          icon: 'eye-outline',
        },
        {
          title: 'Crear Instalaciones',
          icon: 'home-outline',
        },
      ]
    },
    {
      title: 'Help',
      icon: 'question-mark-circle-outline'
    },
  ];
}
