interface ITransactionDetails {
  origin: string;
}

export enum TransactionStatus {
  Approved = 'Approved',
  Declined = 'Declined',
  Pending = 'Pending',
  Cancelled = 'Cancelled',
  InReview = 'In Review',
}

export enum TransactionOrigin {
  MobileApp = 'Mobile App',
  WebbPortal = 'Web Portal',
  InPerson = 'In Person',
  AtmMachine = 'ATM Machine',
  PhoneCall = 'Phone Call',
}

export interface ITransaction {
  objectType: string;
  status: string;
  objectId: string;
  timestamp: string;
  details: ITransactionDetails;
}

export interface TransactionComponentProps {
  transactions: ITransaction[];
  timestamp: string;
}
