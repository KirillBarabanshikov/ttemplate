import { Link } from 'react-router';

export const HomePage = () => {
  return (
    <div>
      <Link to={'/about'}>about</Link>
    </div>
  );
};
