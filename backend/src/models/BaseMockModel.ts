import fs from 'fs';
import path from 'path';

const DATA_DIR = path.resolve(process.cwd(), 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

export class BaseMockModel {
  static dbName: string = '';
  static _limit: any;

  static getFilePath(): string {
    return path.join(DATA_DIR, `${this.dbName.toLowerCase()}.json`);
  }

  static readData(): any[] {
    const filePath = this.getFilePath();
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify([], null, 2));
    }
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(content);
    } catch (err) {
      return [];
    }
  }

  static writeData(data: any[]): void {
    fs.writeFileSync(this.getFilePath(), JSON.stringify(data, null, 2));
  }

  static findOne(query: any) {
    const data = this.readData();
    const found = data.find((item: any) => {
      for (const key in query) {
        if (item[key] !== query[key]) return false;
      }
      return true;
    });
    const wrapped = found ? this.wrapItem(found) : null;

    const promiseObj = {
      then(resolve: any) {
        resolve(wrapped);
      },
      select(_fields: string) {
        return this;
      }
    };
    return promiseObj as any;
  }

  static findById(id: string) {
    const data = this.readData();
    const found = data.find((item: any) => item.id === id || item._id === id);
    const wrapped = found ? this.wrapItem(found) : null;

    const promiseObj = {
      then(resolve: any) {
        resolve(wrapped);
      },
      select(_fields: string) {
        return this;
      }
    };
    return promiseObj as any;
  }

  static async findByIdAndUpdate(id: string, update: any, _options?: any): Promise<any | null> {
    const data = this.readData();
    const idx = data.findIndex((item: any) => item.id === id || item._id === id);
    if (idx === -1) return null;
    const updated = { ...data[idx], ...update, updatedAt: new Date().toISOString() };
    data[idx] = updated;
    this.writeData(data);
    return this.wrapItem(updated);
  }

  static async findByIdAndDelete(id: string): Promise<any | null> {
    const data = this.readData();
    const idx = data.findIndex((item: any) => item.id === id || item._id === id);
    if (idx === -1) return null;
    const deleted = data[idx];
    data.splice(idx, 1);
    this.writeData(data);
    return deleted;
  }

  static async countDocuments(query: any = {}): Promise<number> {
    const data = this.readData();
    return data.filter((item: any) => {
      for (const key in query) {
        if (query[key] === true && item[key] !== true) return false;
        if (query[key] === false && item[key] !== false) return false;
        if (typeof query[key] !== 'boolean' && item[key] !== query[key]) return false;
      }
      return true;
    }).length;
  }

  static async create(itemData: any): Promise<any> {
    const data = this.readData();
    const id = Math.random().toString(36).substring(2, 15);
    const newItem = {
      ...itemData,
      id,
      _id: id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    data.push(newItem);
    this.writeData(data);
    return this.wrapItem(newItem);
  }

  static find(query: any = {}) {
    const data = this.readData();
    let filtered = data.filter((item: any) => {
      for (const key in query) {
        if (item[key] !== query[key]) return false;
      }
      return true;
    });

    const self = this;
    const queryObj = {
      _skipVal: 0,
      _limit: 1000,
      _select: '',
      skip(val: number) {
        this._skipVal = val;
        return this;
      },
      limit(val: number) {
        this._limit = val;
        return this;
      },
      sort(_val: any) {
        return this;
      },
      select(val: string) {
        this._select = val;
        return this;
      },
      then: (resolve: any) => {
        const result = filtered.slice(queryObj._skipVal, queryObj._skipVal + queryObj._limit);
        resolve(result.map(item => self.wrapItem(item)));
      }
    };

    return queryObj;
  }
  static _skip(_skip: any, arg1: any) {
    throw new Error('Method not implemented.');
  }

  static wrapItem(item: any): any {
    const self = this;
    const wrapped = {
      ...item,
      save: async function () {
        let data = self.readData();
        const idx = data.findIndex((d: any) => d.id === this.id || d._id === this._id);
        if (idx !== -1) {
          data[idx] = { ...data[idx], ...this, updatedAt: new Date().toISOString() };
        } else {
          this.createdAt = new Date().toISOString();
          this.updatedAt = new Date().toISOString();
          data.push({ ...this });
        }
        self.writeData(data);
        return this;
      },
      select: function (fields: string) {
        return this;
      }
    };
    return wrapped;
  }

  async save(): Promise<any> {
    const constructor = this.constructor as typeof BaseMockModel;
    let data = constructor.readData();
    const self = this as any;
    const idx = data.findIndex((d: any) => d.id === self.id || d._id === self._id);
    if (idx !== -1) {
      data[idx] = { ...data[idx], ...self, updatedAt: new Date().toISOString() };
    } else {
      self.createdAt = new Date().toISOString();
      self.updatedAt = new Date().toISOString();
      data.push({ ...self });
    }
    constructor.writeData(data);
    return self;
  }
}
