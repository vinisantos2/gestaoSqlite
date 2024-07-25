import { openDatabaseAsync } from 'expo-sqlite';


const db =  openDatabaseAsync('gestao.db' );


export default db;

