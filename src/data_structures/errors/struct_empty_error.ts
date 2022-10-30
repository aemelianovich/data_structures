class StructIsEmptyError extends Error {
  isStructIsEmptyError: boolean;
  constructor(structName: string) {
    const message = `${structName} is empty`;
    super(message);
    this.name = 'StructIsEmptyError';
    this.message = message;
    this.isStructIsEmptyError = true;
  }
}
export default StructIsEmptyError;
