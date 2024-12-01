import React, { useState, useEffect } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper, TextField, Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/authSlice';
import { getPokemonData } from '../services/pokemonService';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const userName = useSelector((state: any) => state.auth.user);
  const [pokemonData, setPokemonData] = useState<any[]>([]);
  const [filteredPokemonData, setFilteredPokemonData] = useState<any[]>([]);
  const [totalPokemon, setTotalPokemon] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    getPokemonAPI();
  }, [page, rowsPerPage]);

  useEffect(() => {
    filterPokemonData();
  }, [searchQuery, pokemonData]);

  const getPokemonAPI = async () => {
    const data = await getPokemonData(rowsPerPage, page * rowsPerPage);

    if (data.success !== false) {
      setPokemonData(data.results); 
      setTotalPokemon(data.count); 
    } else {
      console.error(data.message); 
    }
  };

  const filterPokemonData = () => {
    if (searchQuery === '') {
      setFilteredPokemonData(pokemonData); 
    } else {
      const filtered = pokemonData.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPokemonData(filtered);
    }
  };

  const changePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    if (newPage >= 0 && newPage * rowsPerPage < totalPokemon) {
      setPage(newPage);
    }
  };

  const changeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); 
  };

  const logoutUser = () => {
    dispatch(logout());
  };

  const searchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom="20px">
        <Typography variant="h6">Welcome, {userName}</Typography>
        <Button variant="contained" color="secondary" onClick={logoutUser}>
          Logout
        </Button>
      </Box>

      <TextField
        label="Search Pokémon"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={searchChange} 
        style={{ marginTop: '20px', marginBottom: '20px' }}
      />

      <TableContainer component={Paper}>
        <Table aria-label="pokemon table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Image</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPokemonData.map((pokemon, index) => {
              const pokemonId = pokemon.url.split('/').filter(Boolean).pop();

              return (
                <TableRow key={index}>
                  <TableCell>{pokemon.name}</TableCell>
                  <TableCell>
                    <img
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
                      alt={pokemon.name}
                      width="50"
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 20, 30]}
        component="div"
        count={totalPokemon}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={changePage}
        onRowsPerPageChange={changeRowsPerPage}
      />
    </div>
  );
};

export default Home;
