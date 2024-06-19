export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) ? "" : "Введите корректный email";
};

export const validatePassword = (password: string) => {
  return password ? "" : "Введите пароль";
};

export const validateName = (name: string) => {
  return name ? "" : "Введите имя";
};

export const validateConfirmPassword = (password: string, confirmPassword: string) => {
  if (!confirmPassword) {
    return "Повторите пароль";
  }
  return password === confirmPassword ? "" : "Пароли не совпадают";
};
