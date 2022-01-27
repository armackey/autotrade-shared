import { restClient, websocketClient, referenceClient } from "@polygon.io/client-js";

export class PolygonBase {
  protected client;
  protected wsClient;
  protected referenceClient;
  constructor(private api: string) {
    this.client = restClient(api);
    this.wsClient = websocketClient(api);
    this.referenceClient = referenceClient(api);
  }
}