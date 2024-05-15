const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

const Customer = sequelize.define('customer', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  language: {
    type: DataTypes.STRING,
    allowNull: false
  },
  company_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name_contact_person: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email_contact_person: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  phone_contact_person: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false
  },
  postal_code: {
    type: DataTypes.STRING,
    allowNull: false
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false
  },
  payment_due_days: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  company_id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  ean: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
});

module.exports = Customer;
