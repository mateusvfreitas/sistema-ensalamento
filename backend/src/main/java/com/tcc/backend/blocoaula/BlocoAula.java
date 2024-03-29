package com.tcc.backend.blocoaula;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.tcc.backend.curso.Curso;
import com.tcc.backend.enums.EnDiaSemana;
import com.tcc.backend.horarioaula.HorarioAula;
import com.tcc.backend.sala.Sala;
import com.tcc.backend.sala.atributosala.AtributoSala;

import lombok.Data;

@Data
@Entity
@Table
public class BlocoAula {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_curso")
    private Curso curso;

    private String disciplina;

    private String turma;

    private EnDiaSemana diaSemana;

    @ManyToOne
    @JoinColumn(name = "id_horario_inicio")
    private HorarioAula horarioInicio;

    @ManyToOne
    @JoinColumn(name = "id_horario_fim")
    private HorarioAula horarioFim;

    @ManyToMany
    @JoinTable(name = "bloco_aula_atributo_sala", joinColumns = @JoinColumn(name = "id_bloco_aula"), inverseJoinColumns = @JoinColumn(name = "id_atributo_sala"))
    private List<AtributoSala> atributosSala;

    @ManyToOne
    @JoinColumn(name = "id_sala_especifica")
    private Sala salaEspecifica;

    @ManyToOne
    @JoinColumn(name = "id_sala_atual")
    private Sala salaAtual;
}
