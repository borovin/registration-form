import store from 'test-utils/store';

export type DbConnectPropsType = {
  name?: string,
  defaultData?: any
};

export type DbConnectType = (name?: string, defaultData?: any) => Promise<any>;

const dbConnect: DbConnectType = async (name = 'default', defaultData = {}) => {
  const db = {
    data: store[name]?.data || defaultData,
    async read() {
      return this.data;
    },
    async write() {
      store[name] = this;
    },
  };

  await db.read();

  return db;
};

export default dbConnect;
