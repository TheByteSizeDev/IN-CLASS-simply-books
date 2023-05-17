import Link from 'next/link';
import PropTypes from 'prop-types';

function SearchItem({ item }) {
  return (
    <>
      <Link passHref href={`/${item.type}/${item.firebaseKey}`}>
        <h2>{item.title}</h2>
      </Link>
      <p>{item.type}</p>
    </>
  );
}

SearchItem.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    firebaseKey: PropTypes.string,
    type: PropTypes.string,
  }),
};

SearchItem.defaultProps = {
  item: {
    title: '',
    firebaseKey: '',
    type: '',
  },
};

export default SearchItem;
