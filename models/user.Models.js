const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Por favor teclea tu nombre']
    },
    email: {
        type: String,
        required: [true, 'Por favor teclea tu email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Por favor teclea tu contraseña']
    },
    
    esAdmin: {
        type: Boolean,  
        default: false
    }

}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)