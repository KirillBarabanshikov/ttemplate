import { Link } from 'react-router';

export const HomePage = () => {
  return (
    <div>
      <Link to={'/about'}>about</Link>
      <img src={'/vite.svg'} width={200} height={200} />
    </div>
  );
};
