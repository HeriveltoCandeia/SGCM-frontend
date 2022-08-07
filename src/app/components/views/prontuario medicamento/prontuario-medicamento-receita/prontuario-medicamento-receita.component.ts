import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProntuarioMedicamentoService } from '../prontuario-medicamento.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProntuarioMedicamento } from '../prontuario-medicamento.model';
import { MatDialog } from '@angular/material/dialog';
import { ProntuarioMedicamentoExcluiComponent } from '../prontuario-medicamento-exclui/prontuario-medicamento-exclui.component';
import { AuthService } from 'src/app/components/auth/auth.service';
import { jsPDF } from "jspdf";
import { ProntuarioService } from '../../prontuario/prontuario.service';
@Component({
  selector: 'app-prontuario-medicamento-receita',
  templateUrl: './prontuario-medicamento-receita.component.html',
  styleUrls: ['./prontuario-medicamento-receita.component.css']
})
export class ProntuarioMedicamentoReceitaComponent implements OnInit {

  prontuariosMedicamentos: ProntuarioMedicamento[] | undefined;
  dataAtu!: Date;

  displayedColumns: string[] = ['medicamento'];//, 'acoes'];
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
    private service: ProntuarioMedicamentoService,
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
    this.service.pesquisarPorProntuarioMedico(this.prontuarioOrigem).subscribe(resposta =>{
      this.prontuariosMedicamentos = resposta;
      this.dataSource = new MatTableDataSource<ProntuarioMedicamento>(this.prontuariosMedicamentos);
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