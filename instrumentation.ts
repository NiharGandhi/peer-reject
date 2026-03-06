export async function register() {
  // pdf-parse v2 depends on `canvas` which references DOMMatrix at module load time.
  // This polyfill runs before any server code so the stub is in place when the
  // external module initializes in the Node.js serverless environment.
  if (typeof globalThis.DOMMatrix === 'undefined') {
    // @ts-expect-error minimal stub — canvas only needs the constructor to exist
    globalThis.DOMMatrix = class DOMMatrix {};
  }
}
