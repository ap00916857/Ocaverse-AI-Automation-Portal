export const ADMIN_EMAIL = "hello@ocaverse.com";
export const isAdmin = (email?: string | null) =>
  !!email && email.toLowerCase() === ADMIN_EMAIL.toLowerCase();
