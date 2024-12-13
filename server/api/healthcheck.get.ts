import { sequelize } from "~/server/utils/db.instance";

export default defineEventHandler(async () => {
  try {
    // await sequelize.authenticate();
    return { status: "success", message: "Połączenie z bazą danych działa!" };
  } catch (error) {
    return {
      status: "error",
      message: "Nie udało się połączyć z bazą danych",
      details: error.message,
    };
  }
});
