import { LinkButton } from './LinkButton';

const Footer = () => {
  return (
    <footer className="py-8 bg-neutral-100">
      <div className="w-11/12 mx-auto flex items-center justify-between">
        <p className="text-gray-700">
          &copy; {new Date().getFullYear()} |{' '}
          <LinkButton href="/" className="hover:underline">
            loafy
          </LinkButton>
        </p>

        <ul>
          <li>
            <a
              href="https://github.com/TheBoringDude/loafy"
              className="text-gray-700 hover:text-iris hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              Github
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
