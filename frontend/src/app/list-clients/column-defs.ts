export default [
  {
    field: 'nome',
    headerName: 'Nome',
    checkboxSelection: true,
  },
  {
    field: 'idade',
    filter: 'agNumberColumnFilter',
    type: 'rightAligned',
    width: 120,
  },
  { field: 'email', headerName: 'E-mail', width: 240 },
  { field: 'cpf', headerName: 'CPF' },
  { field: 'dataNascimento', headerName: 'Nascimento', width: 150 },
];
