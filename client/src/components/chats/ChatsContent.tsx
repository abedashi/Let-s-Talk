import moment from 'moment-timezone';
import ScrollToBottom from 'react-scroll-to-bottom';

const formattedTime = (date: string) => {
  const newDate = moment.utc(date);
  const formattedTime = newDate.local().format('h:mm A');
  return formattedTime;
};

// const formattedTime = (date: string) => {
//   const newDate = new Date(date);
//   const formattedTime = newDate.toLocaleTimeString('en-US', {
//     hour: 'numeric',
//     minute: 'numeric',
//     hour12: true,
//   });
//   return formattedTime;
// };

type message = {
  id: string;
  name: string;
  message: string;
  createdAt: string;
};

type Props = {
  messages: message[];
  first_name: string;
  last_name: string;
};
type MessageGroup = [date: string, messages: message[]];

const ChatsContent: React.FC<Props> = ({ messages, first_name, last_name }) => {
  // group messages by date
  const groupedMessages = messages?.reduce((groups: any, message: message) => {
    const date = moment(message.createdAt).format('dddd MMMM Do');

    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
    return groups;
  }, {});

  // console.log('groupedMessages:', groupedMessages);

  const messageGroups: MessageGroup[] = groupedMessages
    ? Object.entries(groupedMessages)
    : [];

  // console.log('messageGroups:', messageGroups);

  return (
    <ScrollToBottom className='flex-1 bg-background p-5 overflow-y-scroll flex flex-col'>
      {messageGroups.map(([date, messages]) => (
        <div key={date}>
          <h3 className='text-center chat-footer opacity-50'>{date}</h3>
          <ul>
            {messages.map((message, index) => {
              return (
                <li
                  key={index}
                  className={`chat ${
                    message.name === first_name + ' ' + last_name
                      ? 'chat-end'
                      : 'chat-start'
                  }`}
                >
                  <div className='chat-header'>
                    <time className='text-xs opacity-50'>
                      {formattedTime(message.createdAt)}
                    </time>
                  </div>
                  <div
                    className={`chat-bubble ${
                      message.name === first_name + ' ' + last_name
                        ? 'bg-primary'
                        : 'bg-sec'
                    }`}
                  >
                    {message.message}
                  </div>
                  {/* <div className='chat-footer opacity-50'>Seen</div> */}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </ScrollToBottom>
  );
};

export default ChatsContent;
