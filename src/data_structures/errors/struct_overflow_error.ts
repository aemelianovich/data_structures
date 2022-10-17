class StructOverflowError extends Error {
  isStructOverflowError: boolean;
  constructor(structName: string) {
    const message = `${structName} is overflow`;
    super(message);
    this.name = 'StructOverflowError';
    this.message = message;
    this.isStructOverflowError = true;
  }
}
export default StructOverflowError;
