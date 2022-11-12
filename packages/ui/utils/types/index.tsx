export interface IQuant{
  _id: string;
  name: string;
  created_at: Date;
  period: string;
  notes: string;
  date?: Date;
  tags: string[];
  user: string;
  status: number;
}

export interface IUser{
  address: string;
  daily_count: IDailyCount[];
  created_at: Date;
}


export interface IUserLogin{
  address: string;
  loggedIn: boolean;
  dailyCount: IDailyCount[];
}

export interface IAdmin{
  _id: string;
  name: string;
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
  [key: string]: IQuant[];
}
