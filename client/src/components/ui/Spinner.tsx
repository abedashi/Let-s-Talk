type Props = {
  text: string;
};

const Spinner: React.FC<Props> = ({ text }) => {
  return (
    <div className='loadingSpinnerContainer'>
      <progress className='progress progress-primary bg-sec w-56'></progress>
      <div className='pt-3'>{text}</div>
    </div>
  );
};

export default Spinner;
