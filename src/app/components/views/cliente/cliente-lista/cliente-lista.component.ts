import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from '../cliente.model';
import { ClienteService } from '../cliente.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-cliente-lista',
  templateUrl: './cliente-lista.component.html',
  styleUrls: ['./cliente-lista.component.css']
})
export class ClienteListaComponent implements OnInit {

  clientes: Cliente[] | undefined;

  displayedColumns: string[] = ['id', 'descricao', 'acoes'];
  dataSource : any;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;


  constructor( private service: ClienteService, private router:Router) {
  }

  ngOnInit(): void {
    this.findAll();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  
  findAll(){
    this.service.pesquisarTodos().subscribe(resposta =>{
      this.clientes = resposta;
      this.dataSource = new MatTableDataSource<Cliente>(this.clientes);
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  incluirCliente(){
    this.router.navigate(["clientes/inclui"]);
  }

  excluirCliente(){
}
}