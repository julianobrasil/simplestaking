export interface Operation {
  row_id: number;
  hash?: string;
  type?: string;
  block?: string;
  time?: Date;
  height?: number;
  cycle?: number;
  counter?: number;
  op_n?: number;
  op_l?: number;
  op_p?: number;
  op_c?: number;
  op_i?: number;
  status?: string;
  is_success?: boolean;
  is_contract?: boolean;
  gas_limit?: number;
  gas_used?: number;
  gas_price?: number;
  storage_limit?: number;
  storage_size?: number;
  storage_paid?: number;
  volume?: number;
  fee?: number;
  reward?: number;
  deposit?: number;
  burned?: number;
  is_internal?: boolean;
  has_data?: boolean;
  days_destroyed?: number;
  sender?: string;
  receiver?: string;
  branch_id?: number;
  branch_height?: number;
  branch_depth?: number;
  branch?: string;
  is_implicit?: boolean;
  entrypoint_id?: number;
  is_orphan?: boolean;
  is_batch?: boolean;
}
