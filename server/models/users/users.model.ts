import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../utils/db.instance";

class Users extends Model {
  declare id: number;
  declare email: string;
  declare password: string;
  declare createdAt: string;
  declare updatedAt: string;
}

Users.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "users",
  }
);

export { Users };
