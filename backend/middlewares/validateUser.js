export const validateRegister = (req, res, next) => {
  let { name, email, phone, password } = req.body;

  if (!name || !email || !phone || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  // Trim & normalize
  name = name.trim();
  email = email.trim().toLowerCase();
  phone = phone.trim();

  req.body.name = name;
  req.body.email = email;
  req.body.phone = phone;

  // Email validation
  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email format",
    });
  }

  // Phone validation (India)
  const phoneRegex = /^[6-9]\d{9}$/;
  if (!phoneRegex.test(phone)) {
    return res.status(400).json({
      success: false,
      message: "Invalid phone number",
    });
  }

  // Password validation
  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 6 characters",
    });
  }

  next();
};