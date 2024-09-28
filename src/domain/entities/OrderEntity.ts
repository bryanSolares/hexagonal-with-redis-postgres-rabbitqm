export class OrderEntity {
  constructor(
    public readonly id: string,
    public readonly clientId: string,
    public readonly products: string[],
    status: string
  ) {}
}
