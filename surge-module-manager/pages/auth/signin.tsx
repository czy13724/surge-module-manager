import { GetServerSideProps } from 'next';
import { getProviders, signIn } from 'next-auth/react';
import { getSession } from 'next-auth/react';

export default function SignIn({ providers }: any) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Surge Module Manager
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            请使用 GitHub 账号登录以继续
          </p>
        </div>
        <div className="mt-8 space-y-6">
          {Object.values(providers).map((provider: any) => (
            <div key={provider.name} className="text-center">
              <button
                onClick={() => signIn(provider.id)}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                使用 {provider.name} 登录
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const providers = await getProviders();
  return {
    props: { providers },
  };
};
