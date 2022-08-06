import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ProntuarioService } from '../prontuario.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Prontuario } from '../prontuario.model';
import { Funcionario } from '../../funcionario/funcionario.model';
import { Cliente } from '../../cliente/cliente.model';
import { ClienteEditaComponent } from '../../cliente/cliente-edita/cliente-edita.component';
import { ChavePesquisa } from '../../agenda/chavePesquisa.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ClienteService } from '../../cliente/cliente.service';
import { FuncionarioService } from '../../funcionario/funcionario.service';
import { AuthService } from 'src/app/components/auth/auth.service';
@Component({
  selector: 'app-prontuario-lista',
  templateUrl: './prontuario-lista.component.html',
  styleUrls: ['./prontuario-lista.component.css']
})
export class ProntuarioListaComponent implements OnInit {

  prontuarios: Prontuario[] | undefined;
  dataAtu!: Date;
  formularioPesquisa!: FormGroup;
  clientes: Cliente[] = [];
  medicos: Funcionario[] = [];
  dataAtual: Date = new Date();

  cargoUsuario: string='';
  idUsuario: string='';
  habilitarExcluir: boolean = false;
  habilitarIncluir: boolean = false;
  habilitarEditar: boolean = false;


  displayedColumns: string[] = ['dataTimeProntuario', 'medico', 'cliente', 'situacao', 'acoes'];//, 'acoes'];
  dataSource : any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor( 
    private service: ProntuarioService, 
    private router:Router,
    private serviceCli: ClienteService,
    private fb: FormBuilder,
    private serviceAuth: AuthService,
    private serviceFunc: FuncionarioService) {
  }

  ngOnInit(): void {
    this.cargoUsuario = this.serviceAuth.getCargo();
    this.idUsuario = this.serviceAuth.getIdUsuario();
    this.verificaAcesso();

    this.dataAtu  = new Date();

    this.formularioPesquisa = this.fb.group({
      dataPesquisa:[''],
      codigoMedicoId:[''],
      codigoClienteId:[''],
    })
    this.buscarClientes();    
    this.buscarMedicos();
    this.formularioPesquisa.get("dataPesquisa")?.setValue(this.dataAtu);
    if (parseInt(this.cargoUsuario))
    {
      this.formularioPesquisa.get("codigoMedicoId")?.setValue(this.idUsuario);
    }
    this.pesquisar();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  
  verificaAcesso(){
    if(parseInt(this.cargoUsuario) === 1 || parseInt(this.cargoUsuario) === 3)
    {
      this.habilitarExcluir=true;
      this.habilitarIncluir=true;
    }
    this.habilitarEditar=true;
  
  }

  pesquisar(){

    if(
      this.formularioPesquisa.get("codigoMedicoId")?.value === '0' &&
      this.formularioPesquisa.get("codigoClienteId")?.value === '0' &&
      this.formularioPesquisa.get("dataPesquisa")?.value === null
    )
    {
      this.service.mensagem("Informe ao menos um filtro");
    }
    let func: Funcionario = {nome: '', cpf: '', sexo:'', dataNascimento:'', email:'', codigoCargo: 1, usuario:'', senha:''};
    func.id = this.formularioPesquisa.get("codigoMedicoId")?.value;
    let cli: Cliente = {nome: '', cpf: '', sexo:'', dataNascimento:'', email:''};
    cli.id = this.formularioPesquisa.get("codigoClienteId")?.value;
    let verificaDataInformada = this.formularioPesquisa.get("dataPesquisa")?.value;

    let dataStr = '';

    if (verificaDataInformada !== null ) {

      let dtR: Date = new Date("12/31/9999");
      dtR = verificaDataInformada !== null? this.formularioPesquisa.get("dataPesquisa")?.value : dtR;
      
      let chavP: ChavePesquisa = {diaData:0,mesData:0,anoData:0,horaData:0,minutoData:0,segundoData:0};
      chavP.diaData = dtR.getDate();
      chavP.mesData = dtR.getMonth()+1;
      chavP.anoData = dtR.getFullYear();

      dataStr = '' + (chavP.diaData<=9 ? ('0' + chavP.diaData): chavP.diaData)  + (chavP.mesData<=9?('0' + chavP.mesData) : chavP.mesData) + chavP.anoData;
    }   

    let cliString = cli.id === '' || cli.id === '0' ? "NO" : JSON.stringify(cli);
    let medString = func.id === '' || func.id === '0' ? "NO" : JSON.stringify(func);
    let dataString = dataStr === '' ? "NO" : dataStr;

    //    this.service.pesquisarTodos().subscribe(resposta =>{
    this.service.pesquisarPorFiltros(medString, cliString, dataString).subscribe(resposta =>{
      this.prontuarios = resposta;
      this.dataSource = new MatTableDataSource<Prontuario>(this.prontuarios);
      this.dataSource.paginator = this.paginator;
    });
  }

  limparFiltros()
  {
    this.formularioPesquisa.get("codigoMedicoId")?.setValue('0');
    this.formularioPesquisa.get("codigoClienteId")?.setValue('0');
    this.formularioPesquisa.get("dataPesquisa")?.setValue(null);
  }

  buscarClientes(){
    this.serviceCli.pesquisarTodos().subscribe((resposta) => {
        this.clientes = resposta;
    },err =>{   
        this.service.mensagem(err.error.message);
    })
  }

  buscarMedicos(){
    this.serviceFunc.pesquisarPorCargo("3").subscribe((resposta) => {
        this.medicos = resposta;
    },err =>{   
        this.service.mensagem(err.error.message);
    })
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