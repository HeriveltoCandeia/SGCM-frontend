import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProntuarioMedicamentoService } from '../prontuario-medicamento.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProntuarioMedicamento } from '../prontuario-medicamento.model';
import { MatDialog } from '@angular/material/dialog';
import { ProntuarioMedicamentoExcluiComponent } from '../prontuario-medicamento-exclui/prontuario-medicamento-exclui.component';
import { AuthService } from 'src/app/components/auth/auth.service';
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
  prontuarioOrigem = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  cargoUsuario: string='';
  habilitarExcluir: boolean = false;
  habilitarIncluir: boolean = false;
  habilitarEditar: boolean = false;

  constructor( 
    private service: ProntuarioMedicamentoService, 
    private router:Router, 
    private dialog: MatDialog,
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
    console.log(this.prontuarioOrigem);
    this.service.pesquisarPorProntuarioMedico(this.prontuarioOrigem).subscribe(resposta =>{
      this.prontuariosMedicamentos = resposta;
      this.dataSource = new MatTableDataSource<ProntuarioMedicamento>(this.prontuariosMedicamentos);
      this.dataSource.paginator = this.paginator;
    });
  }

  public formataData(dataRecebida: String){
    let dataFormat = dataRecebida.substring(8,10) + '/' + dataRecebida.substring(5,7) + '/' + dataRecebida.substring(0,4) + ' ' + dataRecebida.substring(11,16);
    return dataFormat;    
  }
/*
  public excluirMedicamento(id: string){
    console.log(id);
    
    const dialogRef = this.dialog.open(ProntuarioMedicamentoExcluiComponent,
      {data: {id: id},});
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        console.log(result);
      });
//    let irParaEdicao : string = "prontuariosMedicamentos/exclui/" + id;
//    this.router.navigate([irParaEdicao]);
  }
*/
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
    let irParaEdicao : string = "prontuarios/edita/" + this.prontuarioOrigem + "/incluiMedicamentos";
    this.router.navigate([irParaEdicao]);
  }

  converteObjetoParaString(objeto: any){
    return JSON.stringify(objeto);
  }
}