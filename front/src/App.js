import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from 'react-bootstrap';
import { ListGroup } from 'react-bootstrap';
import { ListGroupItem } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { ControlLabel } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import { NavItem } from 'react-bootstrap';

class App extends Component {
  
  state = {
    produtos: [],
    produto: {
      nome: 'exemplo1',
      preco: 20
    }
  }

  componentDidMount() {
    this.getProdutos();
  }

  getProdutos = _ => {
    fetch('http://localhost:4000/produtos')
    .then(response => response.json())
    .then(response => this.setState({ produtos: response.data }))
    .catch(err => console.error(err))
  }

  addProduto = _ => {
    const { produto } = this.state;
    fetch(`http://localhost:4000/produtos/add?nome=${produto.nome}&preco=${produto.preco}`)
    .then(this.getProdutos)
    .catch(err => console.error(err))
  }

  renderProduto = ({ IDPRODUTO, NOME, PRECO }) => 
  <footer key={IDPRODUTO}>
    <ListGroup>
      <ListGroupItem 
        bsStyle="info" 
        href={'http://localhost:4000/produtos/'+ IDPRODUTO} >
        <h4>{NOME}</h4><br/>R$ {PRECO}
        <Button bsStyle="danger" href={'http://localhost:4000/produtos/del/'+ IDPRODUTO}>Deletar</Button>
      </ListGroupItem>
    </ListGroup>
  </footer>

  render() {
    const { produtos, produto } = this.state;
    return (
      <header className="App">
     
        
          <Navbar inverse collapseOnSelect>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="#brand">Ecommerce - Jogos</a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav>
                <NavItem eventKey={1}>
                  <ControlLabel>Jogo</ControlLabel>{' '}
                  <FormControl type="text" placeholder="Kingdom Hearts III" 
                  onChange={e => this.setState({ produto: { ...produto, nome: e.target.value}})}/>
                </NavItem>
                <NavItem eventKey={2}>
                  <ControlLabel>Preço</ControlLabel>{' '}
                  <FormControl type="text" placeholder="20,00" 
                  onChange={e => this.setState({ produto: { ...produto, preco: e.target.value}})}/>
                </NavItem>
                <NavItem eventKey={3}>
                <Button onClick={this.addProduto} bsStyle="success">Adiciona as parada</Button>
                </NavItem>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          {produtos.map(this.renderProduto)}
      </header>
      
    );
  }

}

export default App;
