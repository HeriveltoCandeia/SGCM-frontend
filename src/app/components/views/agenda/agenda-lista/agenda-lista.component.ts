import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Agenda } from '../agenda.model';
import { AgendaService } from '../agenda.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AgendaLista } from '../agendaLista.model';
@Component({
  selector: 'app-agenda-lista',
  templateUrl: './agenda-lista.component.html',
  styleUrls: ['./agenda-lista.component.css']
})
export class AgendaListaComponent implements OnInit {

  agendas: AgendaLista[] | undefined;
  dataAtu!: Date;

  displayedColumns: string[] = ['dataAgenda', 'cliente', 'tipo', 'situacao', 'acoes'];//, 'acoes'];
  dataSource : any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor( private service: AgendaService, private router:Router) {
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
      this.agendas = resposta;
      this.dataSource = new MatTableDataSource<AgendaLista>(this.agendas);
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
      case 1:  return 'Agendado';
      case 2:  return 'Cancelado';
      case 3:  return 'Realizado';
      default: return '';
    }
  }

  buscaTipo(codigo: Number): string{
    switch (codigo){
      case 1:  return 'Agenda';
      case 2:  return 'Encaixe';
      case 3:  return 'Retorno';
      default: return '';
    }
  }

  incluirAgenda(){
    this.router.navigate(["agendas/inclui"]);
  }

  converteObjetoParaString(objeto: any){
    return JSON.stringify(objeto);
  }
}