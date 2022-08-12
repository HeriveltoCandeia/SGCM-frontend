import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Agenda } from '../agenda.model';
import { AgendaService } from '../agenda.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AgendaLista } from '../agendaLista.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Cliente } from '../../cliente/cliente.model';
import { Funcionario } from '../../funcionario/funcionario.model';
import { ChavePesquisa } from '../chavePesquisa.model';
import { ClienteService } from '../../cliente/cliente.service';
import { FuncionarioService } from '../../funcionario/funcionario.service';
import { AuthService } from 'src/app/components/auth/auth.service';
@Component({
  selector: 'app-agenda-lista',
  templateUrl: './agenda-lista.component.html',
  styleUrls: ['./agenda-lista.component.css']
})
export class AgendaListaComponent implements OnInit {

  agendas: AgendaLista[] | undefined;
  dataAtu!: Date;
  formularioPesquisa!: FormGroup;
  clientes: Cliente[] = [];
  medicos: Funcionario[] = [];
  dataAtual: Date = new Date();
  cargoUsuario: string='';
  idUsuario: string='';
  displayedColumns: string[] = ['dataAgenda', 'cliente', 'tipo', 'situacao', 'acoes'];//, 'acoes'];
  dataSource : any;

  habilitarExcluir: boolean = false;
  habilitarIncluir: boolean = false;
  habilitarEditar: boolean = false;
  expandir: boolean = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor( 
    private service: AgendaService, 
    private router:Router,
    private serviceCli: ClienteService,
    private serviceAuth: AuthService,
    private fb: FormBuilder,
    private serviceFunc: FuncionarioService) {
  }

  ngOnInit(): void {
    this.dataAtu  = new Date();
    this.idUsuario = this.serviceAuth.getIdUsuario();

    this.formularioPesquisa = this.fb.group({
      dataPesquisa:[''],
      codigoMedicoId:[''],
      codigoClienteId:[''],
      codigoSituacao:[''],
    })

    this.cargoUsuario = this.serviceAuth.getCargo();
    this.verificaAcesso();
    this.buscarClientes();    
    this.buscarMedicos();
    this.formularioPesquisa.get("dataPesquisa")?.setValue(this.dataAtu);
    if (parseInt(this.cargoUsuario)===3)
    {
      this.formularioPesquisa.get("codigoMedicoId")?.setValue(this.idUsuario);
    }
    this.formularioPesquisa.get("dataPesquisa")?.setValue(this.dataAtu);
    this.pesquisar();

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

  verificaAcesso(){
    if(parseInt(this.cargoUsuario) === 1 || parseInt(this.cargoUsuario) === 3)
    {
//      this.habilitarEditar=true;
      this.habilitarExcluir=true;
      this.habilitarIncluir=true;
    }
    this.habilitarEditar=true  
  
  }

  pesquisar(){

    if(
      this.formularioPesquisa.get("codigoMedicoId")?.value === '0' &&
      this.formularioPesquisa.get("codigoClienteId")?.value === '0' &&
      this.formularioPesquisa.get("dataPesquisa")?.value === null &&
      this.formularioPesquisa.get("codigoSituacao")?.value === '0'
     )
    {
      this.service.mensagem("Informe ao menos um filtro");
    }
    let func: Funcionario = {nome: '', cpf: '', sexo:'', dataNascimento:'', email:'', codigoCargo: 1, usuario:'', senha:''};
    func.id = this.formularioPesquisa.get("codigoMedicoId")?.value;
    let cli: Cliente = {nome: '', cpf: '', sexo:'', dataNascimento:'', email:''};
    cli.id = this.formularioPesquisa.get("codigoClienteId")?.value;
    let verificaDataInformada = this.formularioPesquisa.get("dataPesquisa")?.value;
    let codString = this.formularioPesquisa.get("codigoSituacao")?.value;
    let dataStr = '';

    if (verificaDataInformada !== null ) {

      let dtR: Date = new Date("12/31/9999");
      dtR = verificaDataInformada !== null? this.formularioPesquisa.get("dataPesquisa")?.value : dtR;
      
      let chavP: ChavePesquisa = {diaData:0,mesData:0,anoData:0,horaData:0,minutoData:0,segundoData:0};
      chavP.diaData = dtR.getDate();
      chavP.mesData = dtR.getMonth()+1;
      chavP.anoData = dtR.getFullYear();

      dataStr = '' + (chavP.diaData<=9 ? ('0' + chavP.diaData): chavP.diaData)  + (chavP.mesData<=9?('0' + chavP.mesData) : chavP.mesData) + chavP.anoData;
      console.log(dataStr);
    }   
    let cliString = cli.id === '' || cli.id === '0' ? "NO" : JSON.stringify(cli);
    let medString = func.id === '' || func.id === '0' ? "NO" : JSON.stringify(func);
    let dataString = dataStr === '' ? "NO" : dataStr;
    let codigoSituacaoString = codString === '' || codString === '0' ? "NO" : codString;
    console.log(cli.id , cliString);
    console.log(func.id, medString);
    console.log(dataStr, dataString);
    console.log(codString, codigoSituacaoString);

    //    this.service.pesquisarTodos().subscribe(resposta =>{
    this.service.pesquisarPorFiltros(medString, cliString, dataString, codigoSituacaoString).subscribe(resposta =>{
      this.expandir=false;
      this.agendas = resposta;
      console.log(this.agendas);
      this.dataSource = new MatTableDataSource<AgendaLista>(this.agendas);
      this.dataSource.paginator = this.paginator;
    });
  }

  limparFiltros()
  {
    this.formularioPesquisa.get("codigoMedicoId")?.setValue('0');
    this.formularioPesquisa.get("codigoClienteId")?.setValue('0');
    this.formularioPesquisa.get("dataPesquisa")?.setValue(null);
    this.formularioPesquisa.get("codigoSituacao")?.setValue('0');
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
      case 1:  return 'Disponível';
      case 2:  return 'Agendado';
      case 3:  return 'Cancelado';
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

  verificaCliente( cli: Cliente){
    if ( cli === null)
    {
      return "";
    }
    return cli.nome;
  }
}