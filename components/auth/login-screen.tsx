"use client";

import ButtonLogin from '../shared-components/Button';
import Logo from "../shared-components/Logo";
import { useRouter } from 'next/navigation';

export function LoginScreen() {
  const router = useRouter()

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/images/background.jpg')",
        }}
      />

      <div className="absolute inset-0 bg-linear-to-br from-[#191817]/90 via-[#2a0a4a]/80 to-[#6100C2]/80" />

      <div className="relative z-10 flex h-full items-center justify-center text-white">
        <div className="text-center flex flex-col items-center">
          <Logo />

          <p className="text-[18px] mt-5 mb-10">
            Enjoy the newest movies
          </p>

          <ButtonLogin onClick={() => router.push('/home')}>Log in</ButtonLogin>

          <p className="text-base mt-4">
            No account?{" "}
            <span className="underline cursor-pointer">
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}