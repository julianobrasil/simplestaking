export interface ResponseTransaction {
  row_id: number;
  cycle: number;
  time: Date;
  type: string;
  sender: string;
  receiver?: string;
  volume: number;
  fee: number;
  reward: number;
  deposit: number;
}

export interface ResponseTransactionObject {
  data: ResponseTransaction[];
}
