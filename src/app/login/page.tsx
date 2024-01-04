'use client';

import { Button, Container } from '@mui/material';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
  async function onSignIn() {
    await signIn();
  }

  return (
    <Container>
      <Button onClick={onSignIn}>Login</Button>
    </Container>
  );
}
