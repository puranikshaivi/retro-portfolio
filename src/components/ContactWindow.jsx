import { useState } from 'react';
import { Window, WindowHeader, WindowContent, Button } from 'react95';
import styled from 'styled-components';

const StyledWindow = styled(Window)`
  width: 100%;
  max-width: ${({ $variant }) => ($variant === 'message' ? '420px' : '340px')};
  font-family: 'ms_sans_serif';
  box-sizing: border-box;

  @media (max-width: 900px) {
    width: min(340px, calc(100vw - 48px));
    max-width: min(340px, calc(100vw - 48px));
    margin-left: auto;
    margin-right: auto;
  }
`;

const Header = styled(WindowHeader)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const FormGroup = styled.div`
  margin-bottom: 12px;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  margin-bottom: 4px;
  color: #000;
`;

const Input = styled.input`
  width: 100%;
  padding: 6px 8px;
  font-size: 12px;
  font-family: 'ms_sans_serif';
  border: 2px solid;
  border-color: ${({ theme }) => theme.borderDark} ${({ theme }) => theme.borderLight}
    ${({ theme }) => theme.borderLight} ${({ theme }) => theme.borderDark};
  background: ${({ theme }) => theme.canvas || '#fff'};
  box-sizing: border-box;

  &:focus {
    outline: none;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 110px;
  resize: vertical;
  padding: 6px 8px;
  font-size: 12px;
  font-family: 'ms_sans_serif';
  border: 2px solid;
  border-color: ${({ theme }) => theme.borderDark} ${({ theme }) => theme.borderLight}
    ${({ theme }) => theme.borderLight} ${({ theme }) => theme.borderDark};
  background: ${({ theme }) => theme.canvas || '#fff'};
  box-sizing: border-box;

  &:focus {
    outline: none;
  }
`;

const ResumeContent = styled.div`
  display: flex;
  justify-content: center;
  padding: 36px 0;
`;

const DownloadButton = styled(Button)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: 'ms_sans_serif';
  font-size: 12px;
`;

const SocialList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 12px;
  text-decoration: none;
  color: #000;
  border: 2px solid #000;
  background: #fff;
  box-shadow: inset -1px -1px 0 rgba(0, 0, 0, 0.2), inset 1px 1px 0 rgba(255, 255, 255, 0.8);
  transition: transform 0.1s ease;

  &:hover {
    transform: translateY(-1px);
  }
`;

const LinkText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  text-align: left;
`;

const LinkLabel = styled.span`
  font-size: 11px;
  color: #333;
`;

const LinkTitle = styled.span`
  font-size: 13px;
  font-weight: 700;
`;

const MessageForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const FormActionRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  margin-top: 4px;
`;

const FormStatus = styled.p`
  margin: 0;
  font-size: 12px;
  color: ${({ $error }) => ($error ? '#8b0000' : '#064f16')};
`;

const initialForm = {
  name: '',
  email: '',
  message: '',
};

const ContactWindow = ({ variant = 'socials' }) => {
  const isResume = variant === 'resume';
  const isMessage = variant === 'message';
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setStatus('');
  };

  const handleClear = () => {
    setForm(initialForm);
    setStatus('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();

    if (!name || !email || !message) {
      setStatus('Please fill in all fields.');
      return;
    }

    const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;

    if (!endpoint) {
      setStatus('Contact form is not configured yet.');
      return;
    }

    setIsSubmitting(true);
    setStatus('Sending...');

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (!response.ok) {
        throw new Error('Form submission failed');
      }

      setForm(initialForm);
      setStatus('Message sent. Thank you!');
    } catch {
      setStatus('Could not send the message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <StyledWindow $variant={variant}>
      <Header>
        <span>{isResume ? 'Resume.pdf' : isMessage ? 'Send me a message!' : 'Socials.exe'}</span>
        <Button size="sm" square>
          <span style={{ fontWeight: 'bold', transform: 'translateY(-1px)' }}>x</span>
        </Button>
      </Header>

      {isResume ? (
        <WindowContent>
          <ResumeContent>
            <DownloadButton as="a" href="/resume.pdf" download="Shaivi_Puranik_Resume.pdf">
              <img
                src="https://win98icons.alexmeub.com/icons/png/directory_open_file_mydocs-5.png"
                alt=""
                width={20}
                height={20}
              />
              Click here to download my resume
            </DownloadButton>
          </ResumeContent>
        </WindowContent>
      ) : isMessage ? (
        <WindowContent>
          <MessageForm onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="name">Your name</Label>
              <Input id="name" name="name" type="text" placeholder="Your name" value={form.name} onChange={handleChange} />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="email">Your email</Label>
              <Input id="email" name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="message">Your message</Label>
              <TextArea id="message" name="message" placeholder="Tell me a bit about your project or idea..." value={form.message} onChange={handleChange} />
            </FormGroup>

            <FormActionRow>
              <Button type="button" variant="default" onClick={handleClear}>
                Clear
              </Button>
              <Button type="submit" variant="default" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send'}
              </Button>
            </FormActionRow>
            {status && <FormStatus $error={status.includes('not') || status.includes('Could')}>{status}</FormStatus>}
          </MessageForm>
        </WindowContent>
      ) : (
        <WindowContent>
          <SocialList>
            <SocialLink href="https://www.linkedin.com/in/puranikshaivi/" target="_blank" rel="noreferrer">
              <LinkText>
                <LinkLabel>Reach out to me on</LinkLabel>
                <LinkTitle>LinkedIn</LinkTitle>
              </LinkText>
              <img
                src="linkedinIcon.png"
                alt=""
                width={22}
                height={22}
              />
            </SocialLink>

            <SocialLink href="https://github.com/puranikshaivi" target="_blank" rel="noreferrer">
              <LinkText>
                <LinkLabel>Check out my projects on</LinkLabel>
                <LinkTitle>GitHub</LinkTitle>
              </LinkText>
              <img
                src="githubicon.png"
                alt=""
                width={22}
                height={22}
              />
            </SocialLink>

            <SocialLink href="https://substack.com/@pshaivi" target="_blank" rel="noreferrer">
              <LinkText>
                <LinkLabel>Recently started writing on</LinkLabel>
                <LinkTitle>Substack</LinkTitle>
              </LinkText>
              <img
                src="substackIcon.png"
                alt=""
                width={22}
                height={22}
              />
            </SocialLink>
          </SocialList>
        </WindowContent>
      )}
    </StyledWindow>
  );
};

export default ContactWindow;
