const BATCH_TWO_DATA = `T&D collections|55000|Size: L & XL
Alchera|25000|UK 12
T&D collections|35000|Size 10, 12,14 & 16
Bluecoco|25000|Size 10&12
Eking|0|Size 12&14
T&D Collections|40500|Size 10,12 & 14
T&D collections|25000|Size 14
Asy Fashion|65000|Size 14 & 1611
T&D collections|35000|Size 10, 12,14 & 16
T&D Collections|25000|Size 8,10 & 12
Fancy|28500|Size 10,12 & 14.
T&D Collections|25000|Size 8,10 & 12
we|35000|Size: L
T&D Collections|25000|Size 12,14 & 16
T&D Collections|55000|Size 12, 14, 16
T&D Collections|45000|Size 12,14 & 16
T&D Collections|35000|Size 12,14 & 16
Teamo|35000|Size 12, 14 & 16
T&D Collections|30500|Size 12, 14, 16 & 18
T&D Collections|28000|Size 12,14,16 & 18.
T&D Collections|35000|Size 10, 12&14
T&D Collections|35000|Size 14
T&D collections|25000|Size 14&16
T&D Collections|25000|Size 12&14
T&D Collections|28000|Size 8,10,12&14
T&D Collections|35000|Size 12
T&D Collections|28000|Size 10&12
T&D Collections|35000|Size 12,14&16
T&D Collections|45000|Size: US 10&12
T&D Collections|28000|Size : UK 10&12
T&D Collections|40500|Size: Turkey 12&14
T&D Collections|28000|Free size
T&D Collections|28000|UK size 14&16
T&D Collections|55000|Size 8&10
T&D Collections|42000|Size 12,14&16
T&D collections|35000|14&16
T&D Collections|25000|Size 10,12&14
T&D Collections|28000|UK size 14
T&D Collections|35000|US size 12&14
T&D Collections|35000|UK size 12&14
T&D Collections|25000|UK size 12,14& 16
T&D Collections|28000|Turkey size 12,14& 16
T&D Collections|25000|Turkey size 8,10&12
T&D Collections|25000|Uk size 10,12&14
T&D Collections|28000|UK Size 12
T&D Collections|75000|Size 10,12&14
T&D Collections|20000|Free Size
T&D Collections|20000|Free size.
T&D Collections|25000|UK size 12
T&D Collections|25000|Size 14&16.
T&D Collections|35000|Size 10,12&14
T&D Collections|55000|Size 12&14
T&D collections|35000|14&16
T&D Collections|55000|Size 12&14
T&D Collections|35000|12,14&16
T&D Collections|85000|Size 12&14
T&D Collections|28000|Size 12,14&16
T&D Collections|35000|12,14&16
T&D Collections|35000|Size 10&12
T&D Collections|28000|Free size
T&D Collections|20500|10&12
T&D Collections|28000|Free size
T&D Collections|20500|Size 12&14
T&D Collections|18000|Size 12
T&D Collections|38000|Size 14,16&18
T&D Collections|35000|12,14&16
T&D Collections|35000|Turkey 10,12&14
T&D Collections|25000|Size 12,14&16
Italian Top|45000|12,14,16&18
Genese|55000|10,12,14&16
T&D Collections|38000|Turkey Top
T&D Collections|25000|Size 18,10&12
T&D Collections|20000|Free size.
T&D Collections|22500|Size 12,14&16
T&D Collections|25000|UK 12,14,16
T&D Collections|28000|12&14
T&D Collections|22500|UK 12&14.
T&D Collections|25000|Size 14,14&16
T&D Collections|32500|Size 12,14,16&18
T&D Collections|35000|12&14
T&D Collections|28000|10&12
T&D Collections|22500|Free size
T&D Collections|25000|10,12&14
T&D Collections|25000|Free size
T&D Collections|35000|Free size
T&D Collections|20500|10,14&16
T&D Collections|25000|10&12
T&D Collections|35000|US size 14&16
T&D Collections|75000|10,12&14
T&D Collections|55000|12&14
T&D Collections|28500|14&16
T&D Collections|35000|US size 12&14
T&D Collections|32000|12&14
T&D Collections|32000|12&14
T&D Collections|55000|Size 12&14
T&D Collections|32000|12&14
T&D collections|20000|Size 14
T&D Collections|22000|Size 12
T&D Collections|32000|12&14
T&D Collections|35000|Size 12
T&D Collections|45000|12&14
T&D Collections|28000|12&14
T&D Collections|35000|12&14
T&D Collections|45000|12,14&16
T&D Collections|28000|Size 12
T&D Collections|25000|10&12
T&D Collections|25000|10&12
T&D Collections|22000|8,10,12&14
T&D Collections|28000|12,14&16
T&D Collections|38000|12,14&16
T&D Collections|45000|12,14&16`.split('\n');

export const BATCH_TWO_ITEMS = BATCH_TWO_DATA.map((row) => {
  const [brand, rawPrice, size] = row.split('|');
  const numericPrice = Number(rawPrice);
  return [brand, numericPrice ? numericPrice.toLocaleString('en-US') : 'Price on request', numericPrice, size] as const;
});
