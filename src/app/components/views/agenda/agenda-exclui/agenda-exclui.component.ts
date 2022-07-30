import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Agenda } from '../agenda.model';
import { AgendaService } from '../agenda.service';

@Component({
  selector: 'app-agenda-exclui',
  templateUrl: './agenda-exclui.component.html',
  styleUrls: ['./agenda-exclui.component.css']
})
export class AgendaExcluiComponent implements OnInit {

  agenda: Agenda = {
    nome:'',
    cpf: '',
    sexo: '',
    dataNascimento: '',
    email: '',
    convenioMedico:'',
    numeroCarteirinha: ''
  }

  constructor(
    private service: AgendaService, 
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
   this.agenda.id = this.route.snapshot.paramMap.get('id')!;
   this.buscarAgendaParaExcluir();
  }

  buscarAgendaParaExcluir(): void {
    this.service.pesquisarPorId(this.agenda.id!).subscribe((resposta) => {
      this.agenda = resposta;
    });
  }

  excluir(): void{
    this.service.excluir(this.agenda.id!).subscribe((resposta) => {
      this.router.navigate(["agendas"]);
      this.service.mensagem('Agenda excluído com sucesso.');
    },
    err =>{   
      this.service.mensagem(err.error.message);
    }     
    );
  }

  voltar(): void{
    this.router.navigate(["agendas"]);
  }
}
