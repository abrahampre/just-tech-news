const { Model, DataTypes} = require('sequelize');
// nos estamos connectando a sequalize
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

//create our User model

class User extends Model {

    //set up methond to run on instance data (per user) to check password
    checkPassword(loginPw){
        return bcrypt.compareSync(loginPw, this.password)
    }
}

//define table columns and configuration

User.init(
    {
        //define an id column
        id:{
            type:DataTypes.INTEGER,//use special sequilize DataTypes object provide what tipe of data it is
            allowNull:false,//this is the equivelant of sqls NOT NULL option
            primaryKey: true, //instruct that this si the primary key
            autoIncrement:true
        },
        username:{//define username column
            type:DataTypes.STRING,
            allowNull: false
        },
        
        email:{   //define email column
            type: DataTypes.STRING,
            
            allowNull: false,

            
            unique:true,//there cannot be a duplicate email values in this table
           
            validate: {      //iff allownull is set to false, we can run our data through validator 
                isEmail:true   // before creating a table data
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
        hooks:{
            //set up beforeCreate lifecycle "hook" functionality to create the hash on the new password
            async beforeCreate(newUserData){ 
                newUserData.password = await bcrypt.hash(newUserData.password,10)
                return newUserData;
            },
            //set up before udpate lifescycle  to crate has in the updated password
            async beforeUpdate(updatedUserData){
                updatedUserData.password = await bcrypt.hash(updatedUserData.password,10);
                return updatedUserData;
            }
        },

        
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