import { Link } from 'react-router-dom';

function Categories() {
  return (
    <div className='w-fit'>
      <nav className=' w-fit p-4 space-x-1 bg-neutral rounded-box flex items-center justify-center'>
        <Link
          className='btn btn-base-200 carousel-item'
          to={'/searchPage/nintendo'}
        >
          Nintendo
        </Link>
        <Link
          className='carousel-item btn btn-base-200'
          to={'/searchPage/commodore'}
        >
          Commodore
        </Link>
        <Link
          className='carousel-item btn btn-base-200 w-fit'
          to={'/searchPage/atari'}
        >
          Atari
        </Link>
        <Link
          className='carousel-item btn btn-base-200 '
          to={'/searchPage/xbox'}
        >
          Xbox
        </Link>
        <Link
          className='carousel-item btn btn-base-200 '
          to={'/searchPage/playstation'}
        >
          Playstation
        </Link>
        <Link
          className='carousel-item btn btn-base-200 '
          to={'/searchPage/ovrigt'}
        >
          Övrigt
        </Link>
      </nav>
    </div>
  );
}

export default Categories;
