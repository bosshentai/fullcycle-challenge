import Invoice from "../domain/invoice.entity";

export default interface InvoiceGateway {
  find(id: string): Promise<Invoice>;
  generate(input: Invoice): Promise<Invoice>;
}