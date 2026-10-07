const BATCH_FIVE_DATA = `T&D Collections|35000|Free size
T&D Collections|88500|12,14&16
T&D Collections|88500|12,14&16
T&D Collections|88500|12,14&16
T&D Collections|88500|12,14&16
T&D Collections|88500|12,14&16
Bandage Dress|88000|10,12,14 &16
T&D Collections|88500|12,14&16
T&D Collections|150000|Free size
T&D Collections|150000|Free size
T&D Collections|150000|Free  size
T&D Collections|150000|Free size
T&D Collections|150000|Free size
T&D Collections|150000|Free size
T&D Collections|90500|10,12,14&16
T&D Collections|95000|Size 12
T&D Collections|110000|Alex Evening, US 12
Bandage Dress|90000|10,12&14
T&D Collections|45000|Size 11&14
Echer|85000|Turkey 44
T&D Collections|85000|Turkey size 40
T&D Collections|95000|Turkey 10,12&14
T&D Collections|65000|Size 14&16
T&D Collections|75000|Uk 10
T&D Collections|85000|Turkey 46
T&D Collections|75000|Turkey 46
T&D Collections|85000|Turkey 50
T&D Collections|75000|Size
T&D Collections|75000|Size 46
T&D Collections|75000|Turkey 46
T&D Collections|75000|Turkey 46
T&D Collections|85000|Turkey 40
T&D Collections|55000|Free size
T&D Collections|55000|Free size
T&D Collections|55000|Free size
T&D Collections|55000|Uk 10
T&D Collections|65000|Size 48
T&D Collections|65000|Uk 10&12
T&D Collections|75000|Turkey 40
T&D Collections|55000|Free size
T&D Collections|65000|Uk 18
T&D Collections|75000|Free size
T&D Collections|55000|Free Size
T&D Collections|65000|14&16
T&D Collections|55000|10,12&14
T&D Collections|55000|10,12&14
T&D Collections|55000|10&12
T&D Collections|85000|16&18.
T&D Collections|55000|Free size
T&D Collections|120000|10&12
T&D Collections|85000|14&16
T&D Collections|85000|Free Size
T&D Collections|55000|12,14&16
T&D Collections|55000|Turkey 44
T&D Collections|65000|Uk 10&12
T&D Collections|55000|Free size
T&D Collections|55000|10&12
T&D Collections|65000|12&14
T&D Collections|75000|Free size
T&D Collections|85000|12&14
T&D Collections|45000|Free size
T&D Collections|40000|Free size
T&D Collections|40000|Free size
T&D Collections|55000|Turkey 42
T&D Collections|55000|10&12
T&D Collections|75000|12&14
T&D Collections|55000|10,12&14
T&D Collections|65000|10&12
T&D Collections|55000|12&14
T&D Collections|60000|14&16
T&D Collections|45000|Vanessa, 14&16
T&D Collections|65000|14&16
T&D Collections|55000|14&16
T&D Collections|55000|14&16
T&D Collections|45000|14&16
T&D Collections|65000|T&D collections, 14&16
T&D Collections|65000|CYALAA, 14&16
T&D Collections|60000|Classic fashion collection, 14&16
Annie|65000|14&16
Ofoea|55000|14&16
T&D Collections|55000|Mixiu, 14&16
T&D Collections|65000|T&D collections, 14&16
T&D Collections|65000|Teamo, 14&16
Zara|55000|Free size
Jin Yan|85000|14&16
T&D Collections|75000|14&16
Payet|70000|Turkey 40
T&D Collections|65000|14&16
T&D Collections|38500|12&14
T&D Collections|65000|12,14&16
T&D Collections|65000|10,12&14
T&D Collections|65000|14&16
T&D Collections|75000|Turkey 42&44
T&D Collections|65000|12,14&16
T&D Collections|25000|14
T&D Collections|65000|Miate, 10
T&D Collections|75000|10,12&14
T&D Collections|65000|12&14
T&D Collections|75000|12,14&16
Zara|75000|12&14
T&D Collections|75000|12,14&16
T&D Collections|85000|Turkey 40&42
T&D Collections|85000|Turkey 42&44
T&D Collections|75000|12,14&16`.split('\n');

export const BATCH_FIVE_ITEMS = BATCH_FIVE_DATA.map((row) => {
  const [brand, rawPrice, size] = row.split('|');
  const numericPrice = Number(rawPrice);
  return [brand, numericPrice ? numericPrice.toLocaleString('en-US') : 'Price on request', numericPrice, size] as const;
});
