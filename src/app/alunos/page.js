'use client'

import Pagina from '@/components/Pagina'
import { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { FaPen, FaPlusCircle, FaTrash } from 'react-icons/fa'

export default function AlunosPage() {
  const [alunos, setAlunos] = useState([])

  // Carrega a lista de alunos do localStorage
  useEffect(() => {
    const alunosLocalStorage = JSON.parse(localStorage.getItem('alunos')) || []
    setAlunos(alunosLocalStorage)
  }, [])

  // Função para excluir um aluno
  function excluir(aluno) {
    if (window.confirm(`Deseja realmente excluir o aluno ${aluno.nome}?`)) {
      const novaLista = alunos.filter(item => item.matricula !== aluno.matricula)
      localStorage.setItem('alunos', JSON.stringify(novaLista))
      setAlunos(novaLista)
      alert('Aluno excluído com sucesso!')
    }
  }

  return (
    <Pagina titulo={"Lista de Alunos"}>
      <div className='text-end mb-2'>
        <Button href='/alunos/form'><FaPlusCircle /> Novo</Button>
      </div>

      {/* Tabela com os Alunos */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Sobrenome</th>
            <th>Email</th>
            <th>Data de Nascimento</th>
            <th>Telefone</th>
            <th>Faculdade</th>
            <th>Curso</th>
            <th>Período</th>
            <th>Matrícula</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {alunos.map(aluno => (
            <tr key={aluno.matricula}>
              <td>{aluno.nome}</td>
              <td>{aluno.sobrenome}</td>
              <td>{aluno.email}</td>
              <td>{aluno.dataNascimento}</td>
              <td>{aluno.telefone}</td>
              <td>{aluno.faculdade}</td>
              <td>{aluno.curso}</td>
              <td>{aluno.periodo}</td>
              <td>{aluno.matricula}</td>
              <td className='text-center'>
                <Button className='me-2' href={`/alunos/form?matricula=${aluno.matricula}`}><FaPen /></Button>
                <Button variant='danger' onClick={() => excluir(aluno)}><FaTrash /></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Pagina>
  )
}
