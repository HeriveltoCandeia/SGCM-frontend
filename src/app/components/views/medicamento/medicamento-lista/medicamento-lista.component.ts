import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Medicamento } from '../medicamento.model';
import { MedicamentoService } from '../medicamento.service';

@Component({
  selector: 'app-medicamento-lista',
  templateUrl: './medicamento-lista.component.html',
  styleUrls: ['./medicamento-lista.component.css']
})
export class MedicamentoListaComponent implements OnInit {

  medicamentos: Medicamento[] = [];

  displayedColumns: string[] = ['id', 'nomeFabrica', 'acoes'];
  dataSource : any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor( private service: MedicamentoService, private router:Router) {}

  ngOnInit(): void {
    this.findAll();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  findAll(){
    this.service.pesquisarTodos().subscribe(resposta =>{
      this.medicamentos = resposta
      this.dataSource = new MatTableDataSource<Medicamento>(this.medicamentos);
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  incluirMedicamento(){
    this.router.navigate(["medicamentos/inclui"]);
  }

  excluirMedicamento(){
}
}