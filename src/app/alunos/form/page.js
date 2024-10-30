'use client'

import Pagina from '@/components/Pagina'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { FaArrowLeft, FaCheck } from "react-icons/fa"
import { v4 } from 'uuid'
import * as Yup from 'yup'
import { useEffect, useState } from 'react'

export default function AlunoFormPage(props) {
  const router = useRouter()
  
  const [faculdades, setFaculdades] = useState([])
  const [cursos, setCursos] = useState([])
  const [cursosFiltrados, setCursosFiltrados] = useState([])
  const [alunoEditado, setAlunoEditado] = useState(null)

  useEffect(() => {
    // Carrega as faculdades e cursos do localStorage
    const faculdadesLocalStorage = JSON.parse(localStorage.getItem('faculdades')) || []
    const cursosLocalStorage = JSON.parse(localStorage.getItem('cursos')) || []
    
    setFaculdades(faculdadesLocalStorage)
    setCursos(cursosLocalStorage)

    // Recupera a matrícula para edição
    const matricula = props.searchParams.matricula
    const alunos = JSON.parse(localStorage.getItem('alunos')) || []
    const aluno = alunos.find(item => item.matricula === matricula)
    
    if (aluno) {
      setAlunoEditado(aluno)
    }
  }, [props.searchParams.matricula])

  // Função para salvar os dados do aluno
  function salvar(dados) {
    const alunos = JSON.parse(localStorage.getItem('alunos')) || []
    
    if (alunoEditado) {
      // Edita o aluno existente
      Object.assign(alunoEditado, dados)
    } else {
      // Cria um novo aluno
      dados.matricula = v4()
      alunos.push(dados)
    }

    localStorage.setItem('alunos', JSON.stringify(alunos))
    alert("Aluno salvo com sucesso!")
    router.push("/alunos")
  }

  // Campos do form e valores iniciais
  const initialValues = {
    nome: alunoEditado?.nome || '',
    sobrenome: alunoEditado?.sobrenome || '',
    email: alunoEditado?.email || '',
    dataNascimento: alunoEditado?.dataNascimento || '',
    telefone: alunoEditado?.telefone || '',
    faculdade: alunoEditado?.faculdade || '',
    curso: alunoEditado?.curso || '',
    periodo: alunoEditado?.periodo || ''
  }

  // Esquema de validação com Yup
  const validationSchema = Yup.object().shape({
    nome: Yup.string().required("Campo obrigatório"),
    sobrenome: Yup.string().required("Campo obrigatório"),
    email: Yup.string().email("Email inválido").required("Campo obrigatório"),
    dataNascimento: Yup.date().required("Campo obrigatório"),
    telefone: Yup.string().required("Campo obrigatório"),
    faculdade: Yup.string().required("Campo obrigatório"),
    curso: Yup.string().required("Campo obrigatório"),
    periodo: Yup.string().required("Campo obrigatório"),
  })

  // Função para filtrar cursos com base na faculdade selecionada
  const handleFaculdadeChange = (event) => {
    const faculdadeSelecionada = event.target.value;
    const cursosFiltrados = cursos.filter(curso => curso.faculdade === faculdadeSelecionada);
    setCursosFiltrados(cursosFiltrados);
  };

  return (
    <Pagina titulo={"Cadastro de Aluno"}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={salvar}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Row className='mb-2'>
              <Form.Group as={Col}>
                <Form.Label>Nome:</Form.Label>
                <Form.Control
                  name='nome'
                  type='text'
                  value={values.nome}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.nome && !errors.nome}
                  isInvalid={touched.nome && errors.nome}
                />
                <Form.Control.Feedback type='invalid'>{errors.nome}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Sobrenome:</Form.Label>
                <Form.Control
                  name='sobrenome'
                  type='text'
                  value={values.sobrenome}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.sobrenome && !errors.sobrenome}
                  isInvalid={touched.sobrenome && errors.sobrenome}
                />
                <Form.Control.Feedback type='invalid'>{errors.sobrenome}</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className='mb-2'>
              <Form.Group as={Col}>
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  name='email'
                  type='email'
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.email && !errors.email}
                  isInvalid={touched.email && errors.email}
                />
                <Form.Control.Feedback type='invalid'>{errors.email}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Data de Nascimento:</Form.Label>
                <Form.Control
                  name='dataNascimento'
                  type='date'
                  value={values.dataNascimento}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.dataNascimento && !errors.dataNascimento}
                  isInvalid={touched.dataNascimento && errors.dataNascimento}
                />
                <Form.Control.Feedback type='invalid'>{errors.dataNascimento}</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className='mb-2'>
              <Form.Group as={Col}>
                <Form.Label>Telefone:</Form.Label>
                <Form.Control
                  name='telefone'
                  type='text'
                  value={values.telefone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.telefone && !errors.telefone}
                  isInvalid={touched.telefone && errors.telefone}
                />
                <Form.Control.Feedback type='invalid'>{errors.telefone}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Faculdade:</Form.Label>
                <Form.Select
                  name='faculdade'
                  value={values.faculdade}
                  onChange={(event) => {
                    handleChange(event);
                    handleFaculdadeChange(event);
                  }}
                  onBlur={handleBlur}
                  isValid={touched.faculdade && !errors.faculdade}
                  isInvalid={touched.faculdade && errors.faculdade}
                >
                  <option value=''>Selecione</option>
                  {faculdades.map(faculdade => (
                    <option key={faculdade.nome} value={faculdade.nome}>{faculdade.nome}</option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type='invalid'>{errors.faculdade}</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className='mb-2'>
              <Form.Group as={Col}>
                <Form.Label>Curso:</Form.Label>
                <Form.Select
                  name='curso'
                  value={values.curso}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.curso && !errors.curso}
                  isInvalid={touched.curso && errors.curso}
                >
                  <option value=''>Selecione</option>
                  {cursosFiltrados.map(curso => (
                    <option key={curso.nome} value={curso.nome}>{curso.nome}</option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type='invalid'>{errors.curso}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Período:</Form.Label>
                <Form.Control
                  name='periodo'
                  type='text'
                  value={values.periodo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.periodo && !errors.periodo}
                  isInvalid={touched.periodo && errors.periodo}
                />
                <Form.Control.Feedback type='invalid'>{errors.periodo}</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <div className='text-end'>
              <Button variant='secondary' onClick={() => router.push('/alunos')} className='me-2'>
                <FaArrowLeft /> Voltar
              </Button>
              <Button type='submit'>
                <FaCheck /> Salvar
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Pagina>
  )
}
