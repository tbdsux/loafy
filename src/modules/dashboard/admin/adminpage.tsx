import Seo from '../../../components/Seo';
import DefaultLayout from '../../../layouts/Default';
import ChangeEmailSection from './change-email';
import ChangeNameSection from './change-name';
import ChangePasswordSection from './change-password';

const AdminPage = () => {
  return (
    <DefaultLayout>
      <Seo title="Admin" />

      <div className="w-4/5 mx-auto my-12">
        <h3 className="text-lg font-black text-gray-700">manage your administrator account</h3>
        <p className="text-gray-600">
          you will be logged out after editing or changing any of the following credentials
        </p>

        <div className="w-11/12 mx-auto">
          <div className="flex items-center justify-between my-12">
            <ChangeNameSection />

            <ChangeEmailSection />
          </div>

          <div className="w-1/2 mx-auto">
            <ChangePasswordSection />
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default AdminPage;
