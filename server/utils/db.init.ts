import { sequelize } from "./db.instance";

const initDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Połączenie z bazą danych zostało nawiązane.");
  } catch (error) {
    console.error("Błąd podczas łączenia z bazą danych:", error);
  }
};

export { initDatabase };
