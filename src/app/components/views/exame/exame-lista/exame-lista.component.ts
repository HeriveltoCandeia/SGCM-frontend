import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Exame } from '../exame.model';
import { ExameService } from '../exame.service';

@Component({
  selector: 'app-exame-lista',
  templateUrl: './exame-lista.component.html',
  styleUrls: ['./exame-lista.component.css']
})
export class ExameListaComponent implements OnInit {
  [x: string]: any;

  exames: Exame[] = [];

  displayedColumns: string[] = ['id', 'descricao', 'acoes'];
  dataSource : any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor( private service: ExameService, private router:Router) {}

  ngOnInit(): void {
    this.findAll();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  findAll(){
    this.service.pesquisarTodos().subscribe(resposta =>{
      this.exames = resposta
      this.dataSource = new MatTableDataSource<Exame>(this.exames);
      this.dataSource.paginator = this.paginator;
    });
  }

  incluirExame(){
    this.router.navigate(["exames/inclui"]);
  }

  excluirExame(){
}
}