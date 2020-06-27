const formatPrice = (price) => {
  if (price != null) {
    price = Math.round(price);
    return price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + " đ";
  } else {
    return null;
  }
};

export default formatPrice;
