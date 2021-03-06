import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ProntuarioService } from '../prontuario.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Prontuario } from '../prontuario.model';
@Component({
  selector: 'app-prontuario-lista',
  templateUrl: './prontuario-lista.component.html',
  styleUrls: ['./prontuario-lista.component.css']
})
export class ProntuarioListaComponent implements OnInit {

  prontuarios: Prontuario[] | undefined;
  dataAtu!: Date;

  displayedColumns: string[] = ['dataTimeProntuario', 'medico', 'cliente', 'situacao', 'acoes'];//, 'acoes'];
  dataSource : any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor( private service: ProntuarioService, private router:Router) {
  }

  ngOnInit(): void {
    this.findAll();
    this.dataAtu  = new Date("2022-07-29 19:20");
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  
  findAll(){
    this.service.pesquisarTodos().subscribe(resposta =>{
      this.prontuarios = resposta;
      this.dataSource = new MatTableDataSource<Prontuario>(this.prontuarios);
      this.dataSource.paginator = this.paginator;
    });
  }

  public formataData(dataRecebida: String){
    let dataFormat = dataRecebida.substring(8,10) + '/' + dataRecebida.substring(5,7) + '/' + dataRecebida.substring(0,4) + ' ' + dataRecebida.substring(11,16);
    return dataFormat;    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  buscaSituacao(codigo: Number): string{
    switch (codigo){
      case 1:  return 'Iniciado';
      case 2:  return 'Finalizado';
      default: return '';
    }
  }

  incluirProntuario(){
    this.router.navigate(["prontuarios/inclui"]);
  }

  converteObjetoParaString(objeto: any){
    return JSON.stringify(objeto);
  }
}