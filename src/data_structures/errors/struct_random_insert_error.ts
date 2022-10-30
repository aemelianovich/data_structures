class StructRandomInsertError extends Error {
  isStructRandomInsertError: boolean;
  constructor(structName: string) {
    const message = `${structName} does not supprot random insertion`;
    super(message);
    this.name = 'StructRandomInsertError';
    this.message = message;
    this.isStructRandomInsertError = true;
  }
}
export default StructRandomInsertError;
