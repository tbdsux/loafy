import Seo from '../../components/Seo';
import DefaultLayout from '../../layouts/Default';

const LoginPage = () => {
  return (
    <DefaultLayout>
      <Seo title="Authenticate login" />

      <div className="w-5/6 mx-auto py-32">
        <form className="text-center w-2/5 mx-auto shadow-xl rounded-lg p-8">
          <h3 className="text-2xl font-black text-third">login account</h3>
          <p>authenticate your user account to continue...</p>

          <hr className="my-6" />

          <div className="flex flex-col my-2">
            <label htmlFor="email" className="text-left">
              email
            </label>
            <input
              className="py-2 px-4 rounded-lg border"
              placeholder="your email address"
              type="text"
              name="email"
              id="email"
            />
          </div>
          <div className="flex flex-col my-2">
            <label htmlFor="password" className="text-left">
              password
            </label>
            <input
              className="py-2 px-4 rounded-lg border"
              placeholder="your password"
              type="password"
              name="password"
              id="password"
            />
          </div>

          <div className="mt-8">
            <button
              type="submit"
              className="py-2 px-12 rounded-lg bg-third hover:bg-second text-white duration-300"
            >
              login
            </button>
          </div>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default LoginPage;
