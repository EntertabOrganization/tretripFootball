export function getFriendlyAuthError(message: string) {
  if (message.includes('Unsupported provider')) {
    return 'Google sign-in is not enabled yet in Supabase. Enable Google under Authentication > Providers and add the correct callback URL.';
  }

  return message;
}
