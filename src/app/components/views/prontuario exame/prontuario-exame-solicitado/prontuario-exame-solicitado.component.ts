import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProntuarioExameService } from '../prontuario-exame.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProntuarioExame } from '../prontuario-exame.model';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/components/auth/auth.service';
import { jsPDF } from "jspdf";
import { ProntuarioService } from '../../prontuario/prontuario.service';
@Component({
  selector: 'app-prontuario-exame-solicitado',
  templateUrl: './prontuario-exame-solicitado.component.html',
  styleUrls: ['./prontuario-exame-solicitado.component.css']
})
export class ProntuarioExameSolicitadoComponent implements OnInit {

  prontuariosExames: ProntuarioExame[] | undefined;
  dataAtu!: Date;

  displayedColumns: string[] = ['exame'];//, 'acoes'];
  dataSource : any;
  prontuarioOrigem = '';
  nomeMedico = '';
  nomePaciente = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('content', {static: false}) el!: ElementRef;

  cargoUsuario: string='';
  habilitarExcluir: boolean = false;
  habilitarIncluir: boolean = false;
  habilitarEditar: boolean = false;

  constructor( 
    private service: ProntuarioExameService,
    private serviceP: ProntuarioService, 
    private router:Router, 
    private dialog: MatDialog,
    private serviceAuth: AuthService, 
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.cargoUsuario = this.serviceAuth.getCargo();
    this.prontuarioOrigem = JSON.parse(this.route.snapshot.paramMap.get('id')!); 
    this.buscarPacienteMedico();    
    this.findAll();
    this.dataAtu  = new Date("2022-07-29 19:20");
  }

  findAll(){
    this.service.pesquisarPorProntuarioExame(this.prontuarioOrigem).subscribe(resposta =>{
      this.prontuariosExames = resposta;
      this.dataSource = new MatTableDataSource<ProntuarioExame>(this.prontuariosExames);
      this.dataSource.paginator = this.paginator;
    });
  }

  buscarPacienteMedico(){
    this.serviceP.pesquisarPorId(this.prontuarioOrigem).subscribe(resposta =>{
      this.nomePaciente = resposta.cliente.nome;
      this.nomeMedico = resposta.medico.nome;
    });
  }
  public formataData(dataRecebida: String){
    let dataFormat = dataRecebida.substring(8,10) + '/' + dataRecebida.substring(5,7) + '/' + dataRecebida.substring(0,4) + ' ' + dataRecebida.substring(11,16);
    return dataFormat;    
  }

  buscaSituacao(codigo: Number): string{
    switch (codigo){
      case 1:  return 'Iniciado';
      case 2:  return 'Finalizado';
      default: return '';
    }
  }

  gerarReceita(){
    const pdf = new jsPDF('p','pt','a4');
    pdf.html(this.el.nativeElement, {
      callback: (pdf) => {
        pdf.save("receita.pdf");
      }
    });  
  }

  converteObjetoParaString(objeto: any){
    return JSON.stringify(objeto);
  }

  cancelar(){
    let irParaEdicao : string = "prontuarios/edita/" + this.prontuarioOrigem;
    this.router.navigate([irParaEdicao]);
  }

}