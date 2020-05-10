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
      title: 'USUARIO',
      group: true,
    },
    {
      title: 'Requisiciones',
      icon: 'file-text-outline',
      expanded: true,
      children: [
        {
          title: 'Ver Requisiciones',
          url: '/pages/requisition-dashboard',
          icon: 'eye-outline',
        },
        {
          title: 'Crear Requisiciones',
          icon: 'file-add-outline',
        },
      ]
    },
    {
      title: 'ADMINISTRADOR',
      group: true,
    },
    {
      title: 'Usuarios',
      icon: 'people-outline',
      expanded: true,
      children: [
        {
          title: 'Ver Usuarios',
          url: '/pages/user-dashboard',
          icon: 'eye-outline',

        },
        {
          title: 'Crear Usuarios',
          url: '/pages/user-create',
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
          url: 'pages/room-dashboard'
        },
        {
          title: 'Crear Instalaciones',
          icon: 'home-outline',
          url: 'pages/room-create'
        },
      ]
    },
    {
      title: 'Help',
      icon: 'question-mark-circle-outline'
    },
  ];
}
