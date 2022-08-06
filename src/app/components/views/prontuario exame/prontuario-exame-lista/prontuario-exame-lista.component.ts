import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProntuarioExameService } from '../prontuario-exame.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProntuarioExame } from '../prontuario-exame.model';
import { AuthService } from 'src/app/components/auth/auth.service';
@Component({
  selector: 'app-prontuario-exame-lista',
  templateUrl: './prontuario-exame-lista.component.html',
  styleUrls: ['./prontuario-exame-lista.component.css']
})
export class ProntuarioExameListaComponent implements OnInit {

  prontuariosExames: ProntuarioExame[] | undefined;
  dataAtu!: Date;

  displayedColumns: string[] = ['exame', 'orientacoes', 'resultado', 'acoes'];//, 'acoes'];
  dataSource : any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  prontuarioOrigem = '';

  cargoUsuario: string='';
  habilitarExcluir: boolean = false;
  habilitarIncluir: boolean = false;
  habilitarEditar: boolean = false;

  constructor( 
    private service: ProntuarioExameService, 
    private router:Router, 
    private serviceAuth: AuthService, 
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.cargoUsuario = this.serviceAuth.getCargo();
    this.verificaAcesso();

    this.prontuarioOrigem = JSON.parse(this.route.snapshot.paramMap.get('id')!); 
    this.findAll();
    this.dataAtu  = new Date("2022-07-29 19:20");
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  
  verificaAcesso(){
    if(parseInt(this.cargoUsuario) === 1 || parseInt(this.cargoUsuario) === 3)
    {
      this.habilitarExcluir=true;
      this.habilitarIncluir=true;
      this.habilitarEditar=true;
    }  
  }

  findAll(){
    this.service.pesquisarPorProntuarioExame(this.prontuarioOrigem).subscribe(resposta =>{
      this.prontuariosExames = resposta;
      this.dataSource = new MatTableDataSource<ProntuarioExame>(this.prontuariosExames);
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
      case 1:  return 'Solicitado';
      case 2:  return 'Realizado';
      default: return '';
    }
  }

  incluirProntuarioExame(){
    let irParaEdicao : string = "prontuarios/edita/" + this.prontuarioOrigem + "/incluiExames";
    this.router.navigate([irParaEdicao]);
  }

  converteObjetoParaString(objeto: any){
    return JSON.stringify(objeto);
  }
}