import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProntuarioMedicamentoService } from '../prontuario-medicamento.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProntuarioMedicamento } from '../prontuario-medicamento.model';
@Component({
  selector: 'app-prontuario-medicamento-lista',
  templateUrl: './prontuario-medicamento-lista.component.html',
  styleUrls: ['./prontuario-medicamento-lista.component.css']
})
export class ProntuarioMedicamentoListaComponent implements OnInit {

  prontuariosMedicamentos: ProntuarioMedicamento[] | undefined;
  dataAtu!: Date;

  displayedColumns: string[] = ['medicamento', 'orientacoes', 'acoes'];//, 'acoes'];
  dataSource : any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor( private service: ProntuarioMedicamentoService, private router:Router) {
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
      this.prontuariosMedicamentos = resposta;
      this.dataSource = new MatTableDataSource<ProntuarioMedicamento>(this.prontuariosMedicamentos);
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

  incluirProntuarioMedicamento(){
    this.router.navigate(["prontuariosMedicamentos/inclui"]);
  }

  converteObjetoParaString(objeto: any){
    return JSON.stringify(objeto);
  }
}