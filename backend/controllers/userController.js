import User from "../models/userModel.js";

//  Register User
const registerUser = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;



        //  Check existing user
        const existingUser = await User.findOne({
            $or: [{ email }, { phone }]
        });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists with this email or phone, please login",
            });
        }

        // Create new user
        const newUser = new User({
            name,
            email,
            phone,
            password, // hashed automatically via model
            role: "user",
        });

        await newUser.save();

        //  Remove password from response (no extra DB call)
        const user = newUser.toObject();
        delete user.password;

        //  Success response
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Failed to register user",
        });
    }
};

// Login user
const LoginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }
        const findUser = await User.findOne({ email: email.trim().toLowerCase() });
        if (!findUser) {
            return res.status(400).json({
                success: false,
                message: "user not found with this email, please register first"
            })
        }
        const isMatch = await findUser.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            })
        }
        const user = findUser.toObject();
        delete user.password;
        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            user
        });


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Failed to login user",
        });

    }

}

export { registerUser, LoginUser };
