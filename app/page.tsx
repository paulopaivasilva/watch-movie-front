import { LoginScreen } from "@/components/auth/login-screen";
import PageTransition from "@/components/shared-components/page-transition";

export default function Home() {
  return (
    <PageTransition>
      <LoginScreen />
    </PageTransition>
  );
}
