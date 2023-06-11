import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button } from 'react-bootstrap';
import { useTable, usePagination, useSortBy, useFilters } from 'react-table';
import CenteredCard from '../../components/card';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const data = [
    { id: 1, contato: 'João Henrique da Silva', telefone: '(99)9999-9999', email: 'joaohenriquesilva@email.com.br' },
    { id: 2, contato: 'Maria Pereira', telefone: '(99)9999-9999', email: 'email@email.com.br' },
    { id: 3, contato: 'Pedro', telefone: '(99)9999-9999', email: 'email@email.com.br' },
    { id: 4, contato: 'Ana', telefone: '(99)9999-9999', email: 'email@email.com.br' },
    { id: 5, contato: 'Lucas', telefone: '(99)9999-9999', email: 'email@email.com.br' },
    { id: 6, contato: 'Joana', telefone: '(99)9999-9999', email: 'email@email.com.br' },
    { id: 7, contato: 'Mario', telefone: '(99)9999-9999', email: 'email@email.com.br' },
    { id: 8, contato: 'Paulo', telefone: '(99)9999-9999', email: 'email@email.com.br' },
    { id: 9, contato: 'Alan', telefone: '(99)9999-9999', email: 'email@email.com.br' },
    { id: 10, contato: 'Brian', telefone: '(99)9999-9999', email: 'email@email.com.br' },
    { id: 11, contato: 'Celso', telefone: '(99)9999-9999', email: 'email@email.com.br' },
    { id: 12, contato: 'Eduardo', telefone: '(99)9999-9999', email: 'email@email.com.br' },
    { id: 13, contato: 'Felipe', telefone: '(99)9999-9999', email: 'email@email.com.br' },
    { id: 14, contato: 'Jonas', telefone: '(99)9999-9999', email: 'email@email.com.br' },
    { id: 15, contato: 'Jane', telefone: '(99)9999-9999', email: 'email@email.com.br' },
];

const columns = [
    { Header: 'ID', accessor: 'id', Filter: true },
    { Header: 'Contato', accessor: 'contato', Filter: true },
    { Header: 'Telefone', accessor: 'telefone', Filter: false },
    { Header: 'Email', accessor: 'email', Filter: false },
    {
        Header: 'Ações',
        accessor: 'actions',
        disableFilters: true,
        disableSortBy: true,
        Cell: () => (
            <>
                <Button variant="link">
                    <FaEdit />
                </Button>
                <Button variant="link">
                    <FaTrash />
                </Button>
            </>
        ),
    },
];

const handleEditar = () => {
    console.log('Editar');
};

const handleExcluir = () => {
    console.log('Excluir');
};

function DefaultColumnFilter({ column: { filterValue, preFilteredRows, setFilter } }) {
    const count = preFilteredRows.length;
    return (
        <input
            value={filterValue || ''}
            onChange={(e) => {
                setFilter(e.target.value || undefined);
            }}
            placeholder={`Search (${count} records)`}
            className="form-control"
        />
    );
}

function ConsultarContatos() {
    const defaultColumn = {
        Filter: DefaultColumnFilter,
    };

    const [filterInput, setFilterInput] = useState('');

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        prepareRow,
        state: { pageIndex },
        setFilter,
    } = useTable(
        {
            columns,
            data,
            defaultColumn,
            initialState: { pageIndex: 0 },
        },
        useFilters,
        useSortBy,
        usePagination
    );

    const handleFilterChange = (e) => {
        const value = e.target.value || '';
        setFilter

            ('contato', value);
        setFilterInput(value);
    };

    const navigate = useNavigate();

    const adicionar = () => {
        navigate('/cadastrar-contatos');
    }

    return (
        <CenteredCard width="55rem" title="Contatos">

            <div className="container mt-4">
                <div className="d-flex justify-content-between mb-3">
                    <Button variant="primary" onClick={adicionar}>Adicionar</Button>
                    <div className="form-group">
                        <input
                            type="text"
                            value={filterInput}
                            onChange={handleFilterChange}
                            placeholder="Buscar Contato"
                            className="form-control"
                        />
                    </div>
                </div>

                <Table {...getTableProps()} striped bordered>

                    <thead>
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <th
                                        {...column.getHeaderProps(column.getSortByToggleProps())}
                                        className={column.isSorted ? (column.isSortedDesc ? 'desc' : 'asc') : ''}
                                        title=""
                                    >
                                        {column.render('Header')}
                                    </th>
                                ))}

                            </tr>
                        ))}
                    </thead>

                    <tbody {...getTableBodyProps()}>
                        {page.map((row) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map((cell) => {
                                        if (cell.column.id === 'actions') {
                                            return (
                                                <td {...cell.getCellProps()}>
                                                    <div className="d-flex justify-content-between">
                                                        <Button variant="link" onClick={handleEditar}>
                                                            <FaEdit />
                                                        </Button>
                                                        <Button variant="link" onClick={handleExcluir}>
                                                            <FaTrash />
                                                        </Button>
                                                    </div>
                                                </td>
                                            );
                                        }
                                        return (
                                            <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
                <div className="pagination">
                    <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                        {'<<'}
                    </button>
                    <span>
                        Página{' '}
                        <strong>
                            {pageIndex + 1} de {page.length}
                        </strong>{' '}
                    </span>
                    <button onClick={() => nextPage()} disabled={!canNextPage}>
                        {'>>'}
                    </button>
                </div>
            </div>
        </CenteredCard>
    );
}

export default ConsultarContatos;