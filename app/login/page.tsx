import { Container } from '@/components/layout';
import { LoginForm, LoginWithGoogle } from '@/app/login/_components/form';
import { Separator } from '@/components/ui/separator';

export default function Login() {
  return (
    <Container size="sm">
      <div className="space-y-4">
        <LoginWithGoogle />
        <Separator />
        <LoginForm />
      </div>
    </Container>
    
  )
}
