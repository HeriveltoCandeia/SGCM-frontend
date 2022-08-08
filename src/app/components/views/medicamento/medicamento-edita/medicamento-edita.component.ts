import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Medicamento } from '../medicamento.model';
import { MedicamentoService } from '../medicamento.service';

@Component({
  selector: 'app-medicamento-edita',
  templateUrl: './medicamento-edita.component.html',
  styleUrls: ['./medicamento-edita.component.css']
})
export class MedicamentoEditaComponent implements OnInit {

  medicamento: Medicamento = {
    nomeFabrica:'',
    nomeGenerico:'',
    nomeFabricante:''
  }

  constructor(
    private router: Router, 
    private service: MedicamentoService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.medicamento.id = this.route.snapshot.paramMap.get('id')!;
    this.buscarMedicamentoParaAlterar();
  }

  buscarMedicamentoParaAlterar(): void {
    this.service.pesquisarPorId(this.medicamento.id!).subscribe((resposta) => {
      this.medicamento = resposta;
    });
  }

  editar(): void{
    if ( this.medicamento.nomeFabrica === null ||
      this.medicamento.nomeFabrica === null ||
      this.medicamento.nomeFabrica === null
     )
      {
        this.service.mensagem("Todos os campos são obrigatórios.");
        return;
      }
    this.service.editar(this.medicamento.id!, this.medicamento).subscribe((resposta) => {
      this.router.navigate(["medicamentos"]);
      this.service.mensagem("Medicamento alterado com sucesso!");
    },err =>{   
        this.service.mensagem(err.error.message);
    })
  }

  cancelar(){
    this.router.navigate(["medicamentos"]);
  }

}
