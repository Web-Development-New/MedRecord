export const validateEmail = (email: string) => {
  
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) return true;

  alert("You have entered an invalid email address!")
  return false;
  
};

export const randomNumber = () => {
  return Math.floor(100000 + Math.random() * 900000);
}
