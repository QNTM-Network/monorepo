export interface IQuant{
  _id: string;
  name: string;
  created_at: Date;
  period: string;
  notes: string;
  date: Date;
  tags: string[];
}

export interface IUser{
  _id: string;
  name: string;
  email: string;
  address: string;
  password: string;
  created_at: Date;
  daily_count: IDailyCount[];
}


export interface IUserLogin{
  _id: string;
  name: string;
  email: string;
  address: string;
}

export interface IAdmin{
  _id: string;
  name: string;
  email: string;
  address: string;
  password: string;
  created_at: Date;
  daily_count: IDailyCount[];
}

export interface IDailyCount{
  date: Date;
  count: number;
}


export interface IQuantsByTags {
  tag: string;
  quants: IQuant[];
}
