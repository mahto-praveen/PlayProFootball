import React, { useState } from "react";
import styled from "styled-components";
import * as Components from './Components';

// Center wrapper to center everything on the page
const CenterWrapper = styled.div`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f6f5f7;
  padding: 40px 0;
  box-sizing: border-box;
  overflow: auto;
`;

function LoginRegister() {
  const [signIn, setSignIn] = useState(true);
  const [signUpData, setSignUpData] = useState({ name: '', email: '', password: '' });
  const [signInData, setSignInData] = useState({ email: '', password: '' });

  const handleSignUp = e => {
    e.preventDefault();
    // Add sign up logic here
    alert(`Sign Up\nName: ${signUpData.name}\nEmail: ${signUpData.email}`);
  };

  const handleSignIn = e => {
    e.preventDefault();
    // Add sign in logic here
    alert(`Sign In\nEmail: ${signInData.email}`);
  };

  return (
    <CenterWrapper>
      <Components.Container>
        <Components.SignUpContainer signinIn={signIn}>
          <Components.Form onSubmit={handleSignUp}>
            <Components.Title>Create Account</Components.Title>
            <Components.Input
              type='text'
              placeholder='Name'
              value={signUpData.name}
              onChange={e => setSignUpData({ ...signUpData, name: e.target.value })}
              autoComplete="off"
            />
            <Components.Input
              type='email'
              placeholder='Email'
              value={signUpData.email}
              onChange={e => setSignUpData({ ...signUpData, email: e.target.value })}
              autoComplete="off"
            />
            <Components.Input
              type='password'
              placeholder='Password'
              value={signUpData.password}
              onChange={e => setSignUpData({ ...signUpData, password: e.target.value })}
              autoComplete="off"
            />
            <Components.Button type="submit">Sign Up</Components.Button>
          </Components.Form>
        </Components.SignUpContainer>

        <Components.SignInContainer signinIn={signIn}>
          <Components.Form onSubmit={handleSignIn}>
            <Components.Title>Sign in</Components.Title>
            <Components.Input
              type='email'
              placeholder='Email'
              value={signInData.email}
              onChange={e => setSignInData({ ...signInData, email: e.target.value })}
              autoComplete="off"
            />
            <Components.Input
              type='password'
              placeholder='Password'
              value={signInData.password}
              onChange={e => setSignInData({ ...signInData, password: e.target.value })}
              autoComplete="off"
            />
            <Components.Anchor href='#'>Forgot your password?</Components.Anchor>
            <Components.Button type="submit">Sign In</Components.Button>
          </Components.Form>
        </Components.SignInContainer>

        <Components.OverlayContainer signinIn={signIn}>
          <Components.Overlay signinIn={signIn}>
            <Components.LeftOverlayPanel signinIn={signIn}>
              <Components.Title>Welcome Back!</Components.Title>
              <Components.Paragraph>
                To keep connected with us please login with your personal info
              </Components.Paragraph>
              <Components.GhostButton onClick={() => setSignIn(true)}>
                Sign In
              </Components.GhostButton>
            </Components.LeftOverlayPanel>
            <Components.RightOverlayPanel signinIn={signIn}>
              <Components.Title>Hello, Friend!</Components.Title>
              <Components.Paragraph>
                Enter your personal details and start your journey with us
              </Components.Paragraph>
              <Components.GhostButton onClick={() => setSignIn(false)}>
                Sign Up
              </Components.GhostButton>
            </Components.RightOverlayPanel>
          </Components.Overlay>
        </Components.OverlayContainer>
      </Components.Container>
    </CenterWrapper>
  );
}

export default LoginRegister;