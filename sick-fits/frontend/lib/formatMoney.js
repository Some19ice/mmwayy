export default function(amount) {
  const options = {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2
  };
  // if its a whole, dollar amount, leave off the .00
  if (amount % 1 === 0) options.minimumFractionDigits = 0;
  const formatter = new Intl.NumberFormat('en-NG', options);
  return formatter.format(amount / 1);
}
