import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Table, Th, Td, Button, Label, Form, Input, H2, Tbody, ButtonContainer, H1centrlizado } from './styles';

function Home() {
  const [students, setStudents] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: '',
    phone: '',
    email: '',
    accepted: false,
  });

  useEffect(() => {
    fetch('localhost/hotmart_telegram/api_php/php')
      .then((response) => response.json())
      .then((data) => setStudents(data))
      .catch((error) => console.error(error));
  }, []);

  function handleAddStudent(student) {
    setStudents([...students, student]);
    setModalIsOpen(false);
    fetch('localhost/hotmart_telegram/api_php/estudantes.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(student),
    });
  }

  function handleToggleAccepted(student) {
    const updatedStudents = students.map((s) => {
      if (s.email === student.email) {
        return { ...s, accepted: !s.accepted };
      }
      return s;
    });
    setStudents(updatedStudents);
    fetch(`localhost/hotmart_telegram/api_php/estudantes.php/${student.email}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ accepted: !student.accepted }),
    });
  }


  return (
    <div>
      <H1centrlizado>Gerenciamento de Estudantes</H1centrlizado>
      <Button onClick={() => setModalIsOpen(true)}>Cadastrar aluno</Button>
      <Table>
        <thead>
          <tr>
            <Th>Nome</Th>
            <Th>Telefone</Th>
            <Th>Email</Th>
            <Th>Aceito no grupo</Th>
          </tr>
        </thead>
        <Tbody>
          {students.map((student) => (
            <tr key={student.email}>
              <Td>{student.name}</Td>
              <Td>{student.phone}</Td>
              <Td>{student.email}</Td>
              <Td>
                <Input
                  type="checkbox"
                  checked={student.accepted}
                  onChange={() => handleToggleAccepted(student)}
                />
              </Td>
            </tr>
          ))}
        </Tbody>
      </Table>
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <H2>Cadastrar aluno</H2>
        <Form>
          <Label>
            Nome:
            <Input
              type="text"
              value={newStudent.name}
              onChange={(e) =>
                setNewStudent({ ...newStudent, name: e.target.value })
              }
            />
          </Label>
          <br />
          <Label>
            Telefone:
            <Input
              type="text"
              value={newStudent.phone}
              onChange={(e) =>
                setNewStudent({ ...newStudent, phone: e.target.value })
              }
            />
            <ButtonContainer>
              <Button onClick={() => setModalIsOpen(false)}>Close</Button>
            </ButtonContainer>
          </Label>
          <br />
          <Label>
            Email:
            <Input
              type="email"
              value={newStudent.email}
              onChange={(e) =>
                setNewStudent({ ...newStudent, email: e.target.value })
              }
            />
          </Label>
          <br />
          <Button onClick={() => handleAddStudent(newStudent)}>
            Cadastrar
          </Button>
        </Form>
      </Modal>
      <ButtonContainer>
        <Button>Aceitar no grupo</Button>
      </ButtonContainer>
      </div>
  );
}

export default Home;
