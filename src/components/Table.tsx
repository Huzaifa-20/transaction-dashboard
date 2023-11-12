import { ITransaction } from '../types/types';
import transactions from '../mock-data/data.json';
import TableRecord from './TableRecord';

const Table = () => {
  const parsedData = transactions.map((record: ITransaction) => ({
    ...record,
    timestamp: new Date((record.timestamp || '').split('T')[0]).toString(),
  }));

  const groupedTransactions: [string, ITransaction[]] = parsedData.reduce(
    (acc: any, record: ITransaction) => {
      const key = record.timestamp;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(record);
      return acc;
    },
    {}
  );

  return (
    <div className='flex flex-col mt-4 px-12'>
      <div className='flex flex-row justify-between py-4 px-2 '>
        <div className='flex basis-[80%]'>
          <div className='text-lg text-secondary basis-[30%] ml-4'>Title</div>
          <div className='text-lg text-secondary basis-[75%]'>Description</div>
        </div>
        <div className='text-lg text-secondary basis-[20%]'>Date</div>
      </div>
      {Object.entries(groupedTransactions).map(
        (
          [timestamp, transactions]: [string, string | ITransaction[]],
          index: number
        ) => (
          <TableRecord
            transactions={transactions as ITransaction[]}
            timestamp={timestamp}
            key={timestamp + index}
          />
        )
      )}
    </div>
  );
};

export default Table;
