/**
 * Supagay.js
 * A client library for Supagay, the open source Firebase alternative.
 */

export default class SupagayClient {
  constructor(options: any) {
    // Initialize client
  }

  // Various client methods would be defined here

  /**
   * Creates a new Supagay client
   */
  static createClient(options: any): SupagayClient {
    return new SupagayClient(options)
  }
}

export const createClient = SupagayClient.createClient