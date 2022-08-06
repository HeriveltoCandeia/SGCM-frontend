import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/components/auth/auth.service';
import { Funcionario } from '../funcionario.model';
import { FuncionarioService } from '../funcionario.service';

@Component({
  selector: 'app-funcionario-lista',
  templateUrl: './funcionario-lista.component.html',
  styleUrls: ['./funcionario-lista.component.css']
})
export class FuncionarioListaComponent implements OnInit {

  funcionarios: Funcionario[] = [];

  displayedColumns: string[] = ['id', 'descricao', 'acoes'];

  dataSource : any;
 
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  cargoUsuario: string='';
  habilitarExcluir: boolean = false;
  habilitarIncluir: boolean = false;
  habilitarEditar: boolean = false;

  constructor( 
    private service: FuncionarioService, 
    private router:Router,
    private serviceAuth: AuthService) {}

  ngOnInit(): void {
    this.cargoUsuario = this.serviceAuth.getCargo();
    this.verificaAcesso();
    this.findAll();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  findAll(){
    this.service.pesquisarTodos().subscribe(resposta =>{
      this.funcionarios = resposta
      this.dataSource = new MatTableDataSource<Funcionario>(this.funcionarios);
      this.dataSource.paginator = this.paginator;
    });
  }

  verificaAcesso(){
    if(parseInt(this.cargoUsuario) === 1)
    {
      this.habilitarEditar=true;
      this.habilitarExcluir=true;
      this.habilitarIncluir=true;
    }
  
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  incluirFuncionario(){
    this.router.navigate(["funcionarios/inclui"]);
  }

  excluirFuncionario(){
}
}