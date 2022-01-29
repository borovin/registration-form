import { JSONFile, Low } from 'lowdb';
import { join } from 'path';

export type DbConnectPropsType = {
  name?: string,
  defaultData?: any
};

export type DbConnectType = (name?: string, defaultData?: any) => Promise<any>;

const dbConnect: DbConnectType = async (name = 'default', defaultData = {}) => {
  const file = join(process.cwd(), 'db', `${name}.json`);
  const adapter = new JSONFile(file);
  const db = new Low(adapter);

  await db.read();

  db.data ||= defaultData;

  return db;
};

export default dbConnect;
