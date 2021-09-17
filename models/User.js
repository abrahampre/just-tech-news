const { Model, DataTypes} = require ('sequelize');
// nos estamos connectando a sequalize
const sequelize = require('../config/connection');

//create our User model

class User extends Model {}

//define table columns and configuration

User.init(
    {
        //define an id column
        id:{
            //use special sequilize DataTypes object provide what tipe of data it is
            type:DataTypes.INTEGER,
            //this is the equivelant of sqls NOT NULL option
            allowNull:false,

            //instruct that this si the primary key
            primaryKey: true

        },
        //define username column
        username:{
            type:DataTypes.STRING,
            allowNull: false
        },
        //define email column
        email:{
            type: DataTypes.STRING,
            
            allowNull: false,

            //there cannot be a duplicate email values in this table
            unique:true,
            //iff allownull is set to false, we can run our data through validator 
            // before creating a table data
            validate: {
                isEmail:true
            }
        },
        password:{
            // define a password column 
            type: DataTypes.STRING,
            allowNull:false,
            validate:{
            //this means the password must be at least four characters long
            len:[4]
            }
        }
    },
    {
        //TABLE CONFIGURATION OPTIONS GO HERE (https://sequelize.org/v5/manual/models-definition.html#configuration))()

        //pass in our imported sequelize connection (the direct connection to our database)

        sequelize,

        //dont automatically create createdAT/ updateAT timestamp fields
        timestamps: false,
        //dot pluralize name of database table
        freezeTableName: true,
        //use underscores instead of camel-casing(i.e. 'comment_text' and not 'commentText')
        underscored: true,
        //make it so our model name stays lowercase in the database
        modelName: 'user'
    }
);

module.exports = User;