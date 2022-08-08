import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Medicamento } from '../medicamento.model';
import { MedicamentoService } from '../medicamento.service';

@Component({
  selector: 'app-medicamento-exclui',
  templateUrl: './medicamento-exclui.component.html',
  styleUrls: ['./medicamento-exclui.component.css']
})
export class MedicamentoExcluiComponent implements OnInit {

  medicamento: Medicamento = {
    nomeFabrica:'',
    nomeGenerico:'',
    nomeFabricante:''
  }

  constructor(
    private service: MedicamentoService, 
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
   this.medicamento.id = this.route.snapshot.paramMap.get('id')!;
   this.buscarMedicamentoParaExcluir();
  }

  buscarMedicamentoParaExcluir(): void {
    this.service.pesquisarPorId(this.medicamento.id!).subscribe((resposta) => {
      this.medicamento = resposta;
    });
  }

  excluir(): void{
    this.service.excluir(this.medicamento.id!).subscribe((resposta) => {
      this.router.navigate(["medicamentos"]);
      this.service.mensagem('Medicamento excluído com sucesso.');
    },
    err =>{
      this.service.mensagem(err.error.message);
    }     
    );
  }

  voltar(): void{
    this.router.navigate(["medicamentos"]);
  }
}
