import db from './DatabaseInstance';
import { Financa } from './Financa';
const table = "FINANCAS"
const sqlCreate =
  'CREATE TABLE IF NOT EXISTS ' + table +
  '(ID INTEGER PRIMARY KEY NOT NULL,' +
  ' NOME VARCHAR(20),' +
  ' VALOR DOUBLE,' +
  ' DATA VARCHAR(10));';
const sqlInsert =
  'INSERT INTO ' + table + ' (  NOME, VALOR, DATA )' +
  ' VALUES (?,?,?)';
const sqlDelete =
  'DELETE FROM ' + table + ' WHERE ID=?';
const sqlSelect =
  'SELECT * FROM ' + table;

const sqlUpdate = 'UPDATE ' + table +
  ' SET NOME = ?, VALOR = ?, DATA = ? WHERE ID = ? '

class GestorDados {
  public async criarBanco() {

    try {
      const result = (await db).execAsync(sqlCreate)

    } catch (erro) {
      console.log(erro)
    }

  }
  public async remover(chave: string) {
    (await db).runAsync(sqlDelete, chave)

  }
  public async adicionar(financa: Financa) {
    try {
      const result = (await db).runAsync(sqlInsert, financa.nome, financa.valor, financa.data, financa.id)

    } catch (erro) {
      console.log(erro)
    }

  }

  public async update(financa: Financa) {
    console.log(financa)
    try {
      const result = (await db).runAsync(sqlUpdate, financa.nome, financa.valor, financa.data, financa.id)
    } catch (erro) {
      console.log(erro)
    }

  }
  public async obterTodos() {

    let objetos = []
    const result = (await db).getAllSync(sqlSelect)
    result.forEach((item) => objetos.push(item))
    return objetos
  }
}

export default GestorDados;
