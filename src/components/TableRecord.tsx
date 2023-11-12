import { useNavigate } from 'react-router-dom';
import { FaHourglass } from 'react-icons/fa6';
import {
  FaBan,
  FaCheck,
  FaEye,
  FaMobileAlt,
  FaQuestion,
  FaTimes,
  FaPhone,
} from 'react-icons/fa';
import {
  ITransaction,
  TransactionComponentProps,
  TransactionOrigin,
  TransactionStatus,
} from '../types/types';

const renderIcon = (transaction: ITransaction) => {
  if (transaction?.details?.origin === TransactionOrigin.MobileApp)
    return <FaMobileAlt />;
  else if (transaction?.details?.origin === TransactionOrigin.PhoneCall)
    return <FaPhone />;

  switch (transaction?.status) {
    case TransactionStatus.Approved:
      return <FaCheck />;
    case TransactionStatus.Declined:
      return <FaTimes />;
    case TransactionStatus.Pending:
      return <FaHourglass />;
    case TransactionStatus.Cancelled:
      return <FaBan />;
    case TransactionStatus.InReview:
      return <FaEye />;
    default:
      return <FaQuestion />;
  }
};

const TableRecord: React.FC<TransactionComponentProps> = ({
  transactions,
  timestamp,
}) => {
  const navigate = useNavigate();

  const handleClick = (transaction: ITransaction) => {
    if (
      transaction?.status === TransactionStatus.Cancelled ||
      transaction?.status === TransactionStatus.Declined
    )
      navigate('/error', {
        state: {
          screenName: 'Error Screen',
          transactionId: transaction?.objectId,
        },
      });
    else if (
      transaction.details.origin === TransactionOrigin.InPerson ||
      transaction.details.origin === TransactionOrigin.AtmMachine
    )
      navigate('/detail-1', {
        state: {
          screenName: 'Details Screen 1',
          transactionId: transaction?.objectId,
        },
      });
    else
      navigate('/detail-2', {
        state: {
          screenName: 'Details Screen 2',
          transactionId: transaction?.objectId,
        },
      });
  };

  return (
    <div
      className={`w-full flex flex-row justify-between mb-2 py-4 cursor-pointer bg-white`}
      style={{ boxShadow: '0 2px 6px -4px rgba(0, 0, 0, 0.1)' }}
    >
      <div className='flex flex-col basis-[80%]'>
        {transactions.map((transaction) => (
          <div
            className={`flex hover:bg-secondary hover:bg-opacity-10 px-2`}
            key={transaction.objectId}
            onClick={() => handleClick(transaction)}
          >
            <div className='flex flex-row justify-start items-center basis-[30%] ml-4'>
              {renderIcon(transaction)}
              <h1 className='text-lg ml-4'>
                Transaction {transaction?.status}
              </h1>
            </div>
            <div className='w-full text-lg basis-[75%] py-2'>
              The transaction{' '}
              <span className='text-primary'>{transaction?.objectId}</span> has
              been {transaction?.status} from {transaction?.details?.origin}
            </div>
          </div>
        ))}
      </div>
      <div className='flex text-lg justify-start items-center basis-[20%]'>
        {new Date(timestamp).toLocaleString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </div>
    </div>
  );
};

export default TableRecord;
