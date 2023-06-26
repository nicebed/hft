export type RelationEvent =
  | 'main.deposit'
  | 'main.withdraw_hold'
  | 'main.withdraw_done'
  | 'main.transfer'
  | 'main.other'
  | 'trade.hold'
  | 'trade.setted'
  | 'trade.transfer'
  | 'trade.other'
  | 'margin.hold'
  | 'margin.setted'
  | 'margin.transfer'
  | 'margin.other'
  | 'isolated_%s.hold' // TODO check this "%" here and below
  | 'isolated_%s.setted'
  | 'isolated_%s.transfer'
  | 'isolated_%s.other'
  | 'other';
