export interface IQuant{
  _id: string;
  name: string;
  created_at: Date;
  reoccurring: boolean;
  date: Date;
  tags: string[];
}


export interface IQuantsByTags {
  tag: string;
  quants: IQuant[];
}
