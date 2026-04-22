export default function Loading() {
  // Returns null to opt out of global suspense blocking.
  // This allows the static page shells and layout to Server-Side Render (SSR) 
  // immediately without delay, significantly improving initial load times.
  return null;
}
