'use strict';

function _concatAUser(user) {
  return {
    name: user.name,
    firstname: user.firstname,
    lastname: user.lastname,
    username: user.username,
    gender: user.gender,
    email: user.email,
    birthday: user.birthday,
    address1: user.address1,
    address2: user.address2,
    postcode: user.postcode,
    city: user.city,
    county: user.county,
    country: user.country,
    zipCode: user.zipCode,
    countryCode: user.countryCode,
    phone: user.phone,
    avater: user.avater,
    status: user.status,
    invitedBy: user.invitedBy,
    parent: user.parent,
    invitations: user.invitations,
    password: user.password
  };
}

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('User', {

    firstname: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        is: ['^[a-z]+$', 'i'],
        len: [1, 20]
      }
    },

    lastname: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        is: ['^[a-z]+$', 'i'],
        len: [1, 20]
      }
    },

    username: {
      type: DataTypes.STRING(44),
      allowNull: false,
      validate: {
        is: ['^[a-z]+$', 'i'],
        len: [1, 44]
      }
    },

    gender: {
      type: DataTypes.ENUM('man', 'woman', 'other'),
      allowNull: false
    },

    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        isEmail: true
      }
    },

    birthday: {
      type: DataTypes.DATEONLY(),
      allowNull: false,
      validate: {
        isDate: true
      }
    },

    address1: {
      type: DataTypes.STRING(100),
      allowNull: false
    },

    address2: {
      type: DataTypes.STRING(100),
      allowNull: false
    },

    postcode: {
      type: DataTypes.STRING(100),
      allowNull: false
    },

    city: {
      type: DataTypes.STRING(100),
      allowNull: false
    },

    county: {
      type: DataTypes.STRING(100),
      allowNull: false
    },

    country: {
      type: DataTypes.STRING(100),
      allowNull: false
    },

    zipCode: {
      type: DataTypes.STRING(100),
      allowNull: false
    },

    countryCode: {
      type: DataTypes.STRING(100),
      allowNull: false
    },

    phone: {
      type: DataTypes.STRING(100),
      allowNull: false
    },

    avater: {
      type: DataTypes.STRING(100),
      allowNull: false
    },

    status: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    invitedBy: {
      type: DataTypes.INTEGER(),
      allowNull: false
    },

    parent: {
      type: DataTypes.STRING(100),
      allowNull: false
    },

    invitations: {
      type: DataTypes.INTEGER(),
      allowNull: false
    },

    password: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    classMethods: {
      add: function* (user) {
        var row = this.build(_concatAUser(user));
        return yield row.save();
      },

      findByName: function* (name) {
        return yield this.find({where: {name: name}});
      },

      getAll: function* () {
        return yield this.findAll();
      },

      getOrAdd: function* (user) {
        return yield this.findOrCreate({
          where: _concatAUser(user)
        });
      }
    }
  });
};

