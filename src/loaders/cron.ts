/* eslint-disable no-await-in-loop */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import PaymentModel from "@models/payment";
import { CronJob } from "cron";
import { Op } from "sequelize";
import UserModel from "@models/user";

// 0 0 0 * * *
// */5 * * * * *

export default (): void => {
  // Every 00:00
  const checkExpiredPayments = new CronJob(
    "0 0 0 * * *",
    async () => {
      const expiredPayments = await PaymentModel.scope([
        "default",
        "withUser",
      ]).findAll({
        where: {
          expirationDate: {
            [Op.lte]: new Date(),
          },
        },
      });

      for (const index in expiredPayments) {
        const payment = expiredPayments[index];

        await payment.user.removeAccess();
        await payment.destroy();
      }
    },
    null,
    true
  );
};
