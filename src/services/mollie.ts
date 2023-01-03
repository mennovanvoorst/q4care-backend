import { createMollieClient } from "@mollie/api-client";
import config from "@config";

const mollieConfig = {
  apiKey: config.mollie.key,
};

const client = createMollieClient(mollieConfig);

const create = async (
  payment: {
    value: string;
    currency: string;
    description: string;
    metadata?: Record<string, any>;
  },
  options: {
    redirectUrl: string;
    webhookUrl: string;
  }
) =>
  client.payments.create({
    amount: { value: payment.value, currency: payment.currency },
    description: payment.description,
    metadata: payment.metadata || {},
    redirectUrl: options.redirectUrl,
    webhookUrl: options.webhookUrl,
  });

const get = async (id) => client.payments.get(id);

export default {
  create,
  get,
};
